"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Equipment, Description, Rack
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os


api = Blueprint('api', __name__)


@api.route('/addUser', methods=['POST'])
def addUser():
    if request.method == "POST":
        data_form = request.form
        data = {
            "email": data_form.get('email'),
            "coordination": data_form.get('coordination'),
            "username": data_form.get('username'),
            "clientName": data_form.get('clientName'),
            "contract": data_form.get('contract'),
            "service" :data_form.get('service')
        }
        new_user = User(
            username=data.get('username'),
            coordination=data.get('coordination'),
            email=data.get('email'),
            clientName=data.get('clientName'),
            contract=data.get('contract'),
            service = data.get('service')
        )
        db.session.add(new_user)
        try:
            db.session.commit()
            user_id = new_user.id
            user_info = {
                "user_id": user_id,
                "username": new_user.username,
                "coordination": new_user.coordination,
                "email": new_user.email,
                "clientName": new_user.clientName,
                "contract": new_user.contract,
                "service": new_user.service
            }
            return jsonify(user_info), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error occurred while trying to upload User", "error": str(error)}), 500
        return jsonify([]), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_current_user(user_id):
     if request.method == "GET":
        user = User.query.filter_by(id=user_id).first()
        if user:
            user_data = user.serialize()
            return jsonify(user_data), 200
        else:
            return jsonify({"message": "User not found"}), 404


@api.route('/description', methods=['POST'])
def addDescription():
    if request.method=='POST':
        try:
            data_form = request.form
            data={
                "brand": data_form.get("brand"),
                "model": data_form.get("model"),
                "serial": data_form.get("serial"),
                "number_part": data_form.get("number_part"),
                "componentType": data_form.get("componentType"),
                "five_years_prevition": data_form.get("five_years_prevition"),
                "observations": data_form.get("observations"),
            }
            new_description = Description(
            brand=data.get("brand"),
            model=data.get('model'),
            serial=data.get('serial'),
            number_part=data.get('number_part'),
            five_years_prevition=data.get('five_years_prevition'),
            observations=data.get('observations'),
            componentType=data.get('componentType')

        )
            db.session.add(new_description)
            db.session.commit()
            return jsonify({"description_id": description_id}), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error occurred while trying to upload User", "error": str(error)}), 500
        return jsonify([]), 200
    
@api.route('/rack', methods=['POST'])
def add_rack():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        data_form = request.form
        user_id = request.form.get('user_id')

        data = {
            "brand": data_form.get("brand"),
            "model": data_form.get("model"),
            "serial": data_form.get("serial"),
            "number_part": data_form.get("number_part"),
            "componentType": data_form.get("componentType"),
            "service": data_form.get("service"),
            "five_years_prevition": data_form.get("five_years_prevition"),
            "contract": data_form.get("contract"),
            "observations": data_form.get("observations"),
            "has_cabinet": data_form.get("has_cabinet") == "true" if data_form.get("has_cabinet") else False,
            "leased": data_form.get("leased").lower() == "true" if data_form.get("leased") else False,
            "total_cabinets": data_form.get("total_cabinets"),
            "open_closed": data_form.get("open_closed").lower() == "true" if data_form.get("open_closed") else False,
            "security": data_form.get("security").lower() == "true" if data_form.get("security") else False,
            "type_security": data_form.get("type_security"),
            "has_extractors": data_form.get("has_extractors").lower() == "true" if data_form.get("has_extractors") else False,
            "extractors_ubication": data_form.get("extractors_ubication"),
            "modular": data_form.get("modular").lower() == "true" if data_form.get("modular") else False,
            "lateral_doors": data_form.get("lateral_doors").lower() == "true" if data_form.get("lateral_doors") else False,
            "lateral_ubication": data_form.get("lateral_ubication"),
            "rack_unit": data_form.get("rack_unit"),
            "rack_position": data_form.get("rack_position"),
            "rack_ubication":data_form.get("rack_ubication"),
            "has_accessory": data_form.get("has_accessory").lower() == "true" if data_form.get("has_accessory") else False,
            "accessory_description": data_form.get("accessory_description"),
            "rack_width": data_form.get("rack_width"),
            "rack_length": data_form.get("rack_length"),
            "rack_height": data_form.get("rack_height"),
            "internal_pdu": data_form.get("internal_pdu"),
            "input_connector": data_form.get("input_connector"),
            "fases": data_form.get("fases"),
            "output_connector": data_form.get("output_connector"),
            "neutro": data_form.get("neutro").lower() == "true" if data_form.get("neutro") else False,
            "username": data_form.get("username"),}


        if data.get("brand") is None:
            return jsonify({"msg": "Missing brand parameter"}), 400
        if data.get("model") is None:
            return jsonify({"msg": "Missing model parameter"}), 400
        if data.get("serial") is None:
            return jsonify({"msg": "Missing serial parameter"}), 400

        new_description = Description(
            brand=data.get("brand"),
            model=data.get('model'),
            serial=data.get('serial'),
            number_part=data.get('number_part'),
            five_years_prevition=data.get('five_years_prevition'),
            observations=data.get('observations'),
            componentType=data.get('componentType')
        )
        db.session.add(new_description)
        try:
            db.session.commit()
            description_id = new_description.id
            
        # # Crear una instancia de Rack con los datos recibidos
            new_rack = Rack(
                has_cabinet=data.get('has_cabinet'),
                leased=data.get('leased'),
                total_cabinets=data.get('total_cabinets'),
                open_closed=data.get('open_closed'),
                security=data.get('security'),
                type_security=data.get('type_security'),
                has_extractors=data.get('has_extractors'),
                extractors_ubication=data.get('extractors_ubication'),
                modular=data.get('modular'),
                lateral_doors=data.get('lateral_doors'),
                lateral_ubication=data.get('lateral_ubication'),
                rack_unit=data.get('rack_unit'),
                rack_position=data.get('rack_position'),
                rack_ubication=data.get('rack_ubication'),
                has_accessory=data.get('has_accessory'),
                accessory_description=data.get('accessory_description'),
                rack_width=data.get('rack_width'),
                rack_length=data.get('rack_length'),
                rack_height=data.get('rack_height'),
                internal_pdu=data.get('internal_pdu'),
                input_connector=data.get('input_connector'),
                fases=data.get('fases'),
                output_connector=data.get('output_connector'),
                neutro=data.get('neutro'),
                description_id=new_description.id,
                user_id=user_id,
            )
        # # Agregar el nuevo rack a la sesión de la base de datos
            db.session.add(new_rack)
            db.session.commit()
        # Crear una respuesta exitosa
            response_body = {
                "message": "Rack added successfully",
                "rack_id": new_rack.id  # Si deseas devolver el ID del rack creado
            }
            return jsonify(response_body), 200
        except Exception as e:
        # Si ocurre algún error, devolver una respuesta de error
            db.session.rollback()
            return jsonify({"msg": "Error occurred while trying to upload Rack description", "error": str(e)}), 500
    except Exception as e:
        # Si ocurre algún error, devolver una respuesta de error
        return jsonify({"message": str(e)}), 500

@api.route('/equipment', methods=['POST'])
def add_equipment():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        user_id = request.form.get('user_id')
        data_form = request.form
        
        data = {
            'brand': data_form.get('brand'),
            'model': data_form.get('model'),
            'serial': data_form.get('serial'),
            "number_part": data_form.get("number_part"),
            "componentType": data_form.get("componentType"),
            "five_years_prevition": data_form.get("five_years_prevition"),
            "observations": data_form.get("observations"),
            'equipment_width': data_form.get('equipment_width'),
            'equipment_height': data_form.get('equipment_height'),
            'equipment_length': data_form.get('equipment_length'),
            'packaging_width': data_form.get('packaging_width'),
            'packaging_length': data_form.get('packaging_length'),
            'packaging_height': data_form.get('packaging_height'),
            'weight': data_form.get('weight'),
            'anchor_type': data_form.get('anchor_type'),
            'service_area': data_form.get('service_area').lower() == "true" if data_form.get("service_area") else False,
            'service_frontal':data_form.get('service_frontal').lower() == "true" if data_form.get("service_frontal") else False,
            'service_back': data_form.get('service_back').lower() == "true" if data_form.get("service_back") else False,
            'service_lateral': data_form.get('service_lateral').lower() == "true" if data_form.get("service_lateral") else False,
            'access_width': data_form.get('access_width'),
            'access_inclination': data_form.get('access_inclination'),
            'access_length': data_form.get('access_length'),
            'rack_number': data_form.get('rack_number'),
            'rack_unit_position': data_form.get('rack_unit_position'),
            'equip_rack_ubication': data_form.get('equip_rack_ubication'),
            'total_rack_units': data_form.get('total_rack_units'),
            'ac_dc': data_form.get('ac_dc'),
            'input_current': data_form.get('input_current'),
            'power': data_form.get('power'),
            'power_supply': data_form.get('power_supply'),
            'operation_temp': data_form.get('operation_temp'),
            'thermal_disipation': data_form.get('thermal_disipation'),
            'power_config': data_form.get('power_config')
        }
      
        # Crear una instancia de Description con los datos recibidos
        new_description = Description(
            brand=data.get('brand'),
            model=data.get('model'),
            serial=data.get('serial'),
            number_part=data.get('number_part'),
            five_years_prevition=data.get('five_years_prevition'),
            observations=data.get('observations'),
            componentType=data.get('componentType'),
        )
        # Agregar la nueva descripción a la sesión de la base de datos
        db.session.add(new_description)
       
        try:
            db.session.commit()
        
            description_id = new_description.id
        # Crear una instancia de Equipment con los datos recibidos
            new_equipment = Equipment(
                equipment_width=data.get('equipment_width'),
                equipment_height=data.get('equipment_height'),
                equipment_length=data.get('equipment_length'),
                packaging_width=data.get('packaging_width'),
                packaging_length=data.get('packaging_length'),
                packaging_height=data.get('packaging_height'),
                weight=data.get('weight'),
                anchor_type=data.get('anchor_type'),
                service_area=data.get('service_area'),
                service_frontal=data.get('service_frontal'),
                service_back=data.get('service_back'),
                service_lateral=data.get('service_lateral'),
                access_width=data.get('access_width'),
                access_inclination=data.get('access_inclination'),
                access_length=data.get('access_length'),
                rack_number=data.get('rack_number'),
                rack_unit_position=data.get('rack_unit_position'),
                equip_rack_ubication=data.get('equip_rack_ubication'),
                total_rack_units=data.get('total_rack_units'),
                ac_dc=data.get('ac_dc'),
                input_current=data.get('input_current'),
                power=data.get('power'),
                power_supply=data.get('power_supply'),
                operation_temp=data.get('operation_temp'),
                thermal_disipation=data.get('thermal_disipation'),
                power_config=data.get('power_config'),
                description_id=description_id,
                user_id=user_id
            )
        # Agregar el nuevo equipo a la sesión de la base de datos
        
            db.session.add(new_equipment)

            db.session.commit()
          
        # Crear una respuesta exitosa
            response_body = {
                "message": "Description Equipment added successfully",
                "equipment_id": new_equipment.id  # Si deseas devolver el ID del equipo creado
            }
            return jsonify(response_body), 200
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error occurred while trying to upload Equipment description", "error": str(error)}), 500
        

    except Exception as e:
        # Si ocurre algún error, devolver una respuesta de error
        return jsonify({"message": str(e)}), 500

@api.route('/rack/<int:user_id>', methods=['GET'])
def get_all_rack_by_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    racks = Rack.query.filter_by(user_id=user_id).all()
    racks_data = list(map(lambda rack: rack.serialize(), racks))
    return jsonify(racks_data), 200

@api.route('/equipment/<int:user_id>', methods=['GET'])
def get_all_equipment_by_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    equipments = Equipment.query.filter_by(user_id=user_id).all()
    equipments_data = list(map(lambda equipment: equipment.serialize(), equipments))
    return jsonify(equipments_data), 200

@api.route('/equipment/<int:id>', methods=['PUT'])
def edit_equipment(id):
    equipment = Equipment.query.filter_by(id=id).first()
    
    if not equipment:
        return jsonify({"message": "Equipment not found"}), 404
    data =request.get_json() 
    
    equipment.description.brand=data.get('brand')
    equipment.description.model=data.get('model')
    equipment.description.serial=data.get('serial')
    equipment.description.number_part=data.get('number_part')
    equipment.description.five_years_prevition=data.get('five_years_prevition')
    equipment.description.observations=data.get('observations')
    equipment.description.componentType=data.get('componentType')
    equipment.equipment_width=data.get('equipment_width')
    equipment.equipment_height=data.get('equipment_height')
    equipment.equipment_length=data.get('equipment_length')
    equipment.packaging_width=data.get('packaging_width')
    equipment.packaging_length=data.get('packaging_length')
    equipment.packaging_height=data.get('packaging_height')
    equipment.weight=data.get('weight')
    equipment.anchor_type=data.get('anchor_type')
    equipment.service_area=data.get('service_area')
    equipment.service_frontal=data.get('service_frontal')
    equipment.service_back=data.get('service_back')
    equipment.service_lateral=data.get('service_lateral')
    equipment.access_width=data.get('access_width')
    equipment.access_inclination=data.get('access_inclination')
    equipment.access_length=data.get('access_length')
    equipment.rack_number=data.get('rack_number')
    equipment.rack_unit_position=data.get('rack_unit_position')
    equipment.equip_rack_ubication=data.get('equip_rack_ubication')
    equipment.total_rack_units=data.get('total_rack_units')
    equipment.ac_dc=data.get('ac_dc')
    equipment.input_current=data.get('input_current')
    equipment.power=data.get('power')
    equipment.power_supply=data.get('power_supply')
    equipment.operation_temp=data.get('operation_temp')
    equipment.thermal_disipation=data.get('thermal_disipation')
    equipment.power_config=data.get('power_config')

    try:
        db.session.commit()
        return jsonify({'message':'equipment updated'}),200 
    except Exception as error:
        return jsonify({'message':f'{error.args[0]}'}), 500
   
@api.route('/get_equipment/<int:equipment_id>', methods=['GET'])
def get_equipment_by_id(equipment_id):
    equipment = Equipment.query.get(equipment_id)
    if not equipment:
        return jsonify({"message": "Equipment not found"}), 404
    return jsonify(equipment.serialize()), 200

@api.route('/rack/<int:id>', methods=['PUT'])
def edit_rack(id):
    rack = Rack.query.filter_by(id=id).first()
    
    if not rack:
        return jsonify({"message": "Rack not found"}), 404
    data =request.get_json() 
    
    rack.description.brand=data.get('brand')
    rack.description.model=data.get('model')
    rack.description.serial=data.get('serial')
    rack.description.number_part=data.get('number_part')
    rack.description.five_years_prevition=data.get('five_years_prevition')
    rack.description.observations=data.get('observations')
    rack.description.componentType=data.get('componentType')
    rack.has_cabinet=data.get('has_cabinet')
    rack.leased=data.get('leased')
    rack.total_cabinets=data.get('total_cabinets')
    rack.open_closed=data.get('open_closed')
    rack.security=data.get('security')
    rack.type_security=data.get('type_security')
    rack.has_extractors=data.get('has_extractors')
    rack.extractors_ubication=data.get('extractors_ubication')
    rack.modular=data.get('modular')
    rack.lateral_doors=data.get('lateral_doors')
    rack.lateral_ubication=data.get('lateral_ubication')
    rack.service_lateral=data.get('service_lateral')
    rack.rack_unit=data.get('rack_unit')
    rack.rack_position=data.get('rack_position')
    rack.rack_ubication=data.get('rack_ubication')
    rack.has_accessory=data.get('has_accessory')
    rack.accessory_description=data.get('accessory_description')
    rack.rack_width=data.get('rack_width')
    rack.rack_length=data.get('rack_length')
    rack.rack_height=data.get('rack_height')
    rack.internal_pdu=data.get('internal_pdu')
    rack.input_connector=data.get('input_connector')
    rack.fases=data.get('fases')
    rack.output_connector=data.get('output_connector')
    rack.neutro=data.get('neutro')
    
    try:
        db.session.commit()
        return jsonify({'message':'rack updated'}),200 
    except Exception as error:
        return jsonify({'message':f'{error.args[0]}'}), 500

@api.route('/get_rack/<int:rack_id>', methods=['GET'])
def get_rack_by_id(rack_id):
    rack = Rack.query.get(rack_id)
    if not rack:
        return jsonify({"message": "Rack not found"}), 404
    return jsonify(rack.serialize()), 200 

@api.route('/equipment/<int:id>', methods=['DELETE'])
def delete_equipment(id):
    equipment = Equipment.query.get(id)
    if not equipment:
        return jsonify({"message": "Equipment not found"}), 404
    else:
        db.session.delete(equipment)
        try:
            db.session.commit()
            return jsonify({"msg": "Equipment Deleted"}), 200
        except Exception as error:
            return jsonify({"msg": error.args}), 500

@api.route('/rack/<int:id>', methods=['DELETE'])
def delete_rackt(id):
    rack = Rack.query.get(id)
    if not rack:
        return jsonify({"message": "Rack not found"}), 404
    else:
        db.session.delete(rack)
        try:
            db.session.commit()
            return jsonify({"msg": "Rack Deleted"}), 200
        except Exception as error:
            return jsonify({"msg": error.args}), 500
@api.route('/delete_all' , methods=['DELETE'])
def delete_all():
    users= User.query.all()
    descriptions=Description.query.all()
    racks = Rack.query.all()
    equipments= Equipment.query.all()
    
    for rack in racks:
        db.session.delete(rack)
    for eq in equipments:
        db.session.delete(eq)
    for user in users:
        db.session.delete(user) 
    for desc in descriptions:
        db.session.delete(desc)
   
    try:
        db.session.commit()
        return jsonify({"msg": "All Deleted"}), 200
    except Exception as error:
        return jsonify({"msg": error.args}), 500
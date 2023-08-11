"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Equipment, Description, Rack, Client
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/addRack', methods=['POST'])
def add_rack():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        data_form = request.form
        
        data={ 
            "brand":data_form.get("brand"),
            "model":data_form.get("model"),
            "serial":data_form.get("serial"),
            "number_part":data_form.get("number_part"),
            "service":data_form.get("service"),
            "five_years_prevition":data_form.get("five_years_prevition"),
            "contract":data_form.get("contract"),
            "observations":data_form.get("observations"),
            "activity":data_form.get("activity"),
            "has_cabinet":data_form.get("has_cabinet"),
            'leased':data_form.get ('leased'),
            'total_cabinets':data_form.get ('total_cabinets'),
            'open_closed':data_form.get ('open_closed'),
            'security':data_form.get ,
            'security':data_form.get('security') ,
            'type_security':data_form.get('type_security') ,
            'has_extractors':data_form.get ('has_extractors'),
            'extractors_ubication':data_form.get('extractors_ubication') ,
            'modular':data_form.get ('modular'),
            'lateral_doors':data_form.get('lateral_doors') ,
            'lateral_ubication':data_form.get('lateral_ubication') ,
            'rack_unit':data_form.get('rack_unit') ,
            'rack_position':data_form.get('rack_position') ,
            'has_accessory':data_form.get('has_accessory') ,
            'accessory_description':data_form.get('accessory_description') ,
            'rack_width':data_form.get('rack_width') ,
            'rack_length':data_form.get('rack_length') ,
            'rack_height':data_form.get('rack_height') ,
            'internal_pdu':data_form.get('internal_pdu') ,
            'input_connector':data_form.get('input_connector') ,
            'fases':data_form.get('fases') ,
            'output_connector':data_form.get('output_connector'),
            'neutro':data_form.get('neutro'),
            'client':data_form.get('cliente')
        }
        if data.get("brand") is None:
            return jsonify ({"msg": "Missing brand parameter"}), 400
        if data.get("model") is None:
            return jsonify ({"msg": "Missing model parameter"}), 400
        if data.get("serial") is None:
            return jsonify ({"msg": "Missing serial parameter"}), 400
        

        new_description = Description(
            brand=data.get("brand"),
            model=data.get('model'),
            serial=data.get('serial'),
            number_part=data.get('number_part'),
            service=data.get('service'),
            five_years_prevition=data.get('five_years_prevition'),
            observations=data.get('observations'),
            activity=data.get('activity'),
            contract=data.get('contract')
        )
        db.session.add(new_description)
        db.session.commit()
        # Crear una instancia de Rack con los datos recibidos
        new_rack = Rack(
            has_cabinet=data['has_cabinet'],
            leased=data['leased'],
            total_cabinets=data['total_cabinets'],
            open_closed=data['open_closed'],
            security=data['security'],
            type_security=data['type_security'],
            has_extractors=data['has_extractors'],
            extractors_ubication=data['extractors_ubication'],
            modular=data['modular'],
            lateral_doors=data['lateral_doors'],
            lateral_ubication=data['lateral_ubication'],
            rack_unit=data['rack_unit'],
            rack_position=data['rack_position'],
            has_accessory=data.get('has_accessory'),
            accessory_description=data['accessory_description'],
            rack_width=data['rack_width'],
            rack_length=data['rack_length'],
            rack_height=data['rack_height'],
            internal_pdu=data['internal_pdu'],
            input_connector=data['input_connector'],
            fases=data['fases'],
            output_connector=data['output_connector'],
            neutro=data['neutro'],
            description=new_description
            
        )

        # Agregar el nuevo rack a la sesión de la base de datos
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
        return jsonify({"message": str(e)}), 500
    
@api.route('/addEquipment', methods=['POST'])
def add_equipment():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        data = request.json

        # Crear una instancia de Description con los datos recibidos
        new_description = Description(
            brand=data['brand'],
            model=data['model'],
            serial=data['serial'],
            number_part=data['number_part'],
            service=data['service'],
            five_years_prevition=data['five_years_prevition'],
            observations=data['observations'],
            activity=data['activity'],
            contract=data['contract']
            # Agregar más campos según la estructura de Description
        )

        # Agregar la nueva descripción a la sesión de la base de datos
        db.session.add(new_description)
        db.session.commit()

        # Crear una instancia de Equipment con los datos recibidos
        new_equipment = Equipment(
            equipment_width=data['equipment_width'],
            equipment_height=data['equipment_height'],
            equipment_length=data['equipment_length'],
            packaging_width=data['packaging_width'],
            packaging_length=data['packaging_length'],
            packaging_height=data['packaging_height'],
            weight=data['weight'],
            anchor=data['anchor'],
            service_area=data['service_area'],
            access_width=data['access_width'],
            access_inclination=data['access_inclination'],
            access_length=data['access_length'],
            rack_unit_position=data['rack_unit_position'],
            total_rack_units=data['total_rack_units'],
            ac_dc=data['ac_dc'],
            input_current=data['input_current'],
            power=data['power'],
            power_supply=data['power_supply'],
            operation_temp=data['operation_temp'],
            thermal_disipation=data['thermal_disipation'],
            power_config=data['power_config'],
            description=new_description  # Asociar la descripción al equipo
        )
        

        # Agregar el nuevo equipo a la sesión de la base de datos
        db.session.add(new_equipment)
        db.session.commit()

        # Crear una respuesta exitosa
        response_body = {
            "message": "Equipment added successfully",
            "equipment_id": new_equipment.id  # Si deseas devolver el ID del equipo creado
        }

        return jsonify(response_body), 200

    except Exception as e:
        # Si ocurre algún error, devolver una respuesta de error
        return jsonify({"message": str(e)}), 500
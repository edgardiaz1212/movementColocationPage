"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Equipment, Description, Rack, Client
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

@api.route('/user', methods=['POST'])
def register_user():
    if request.method == "POST":
        data_form = request.form
        

        data = {
            "name": data_form.get("name"),
            "email": data_form.get("email"),
            "password": data_form.get("password"),
            "coordination": data_form.get("coordination"),
            "admin": data_form.get("admin")
        }

        if data is None:
            return jsonify({"msg": "Missing JSON in request"}), 400
        if data.get("name") is None:
            return jsonify({"msg": "Missing name parameter"}), 400
        if data.get("email") is None:
            return jsonify({"msg": "Missing email parameter"}), 400
        if data.get("password") is None:
            return jsonify({"msg": "Missing password parameter"}), 400
        if data.get("coordination") is None:
            return jsonify({"msg": "Missing alias parameter "}), 400

        user = User.query.filter_by(email=data.get("email")).first()
        if user is not None:
            return jsonify({"msg": "Email already registered"}), 400

        password_salt = b64encode(os.urandom(32)).decode('utf-8')
        password_hash = set_password(data.get("password"), password_salt)

        new_user = User(
            name=data.get("name"),
            email=data.get("email"),
            password=password_hash,
            coordination=data.get("coordination"),
            admin=data.get("admin"),
            salt=password_salt,
        )
        db.session.add(new_user)
        try:
            db.session.commit()
            return jsonify({"msg": "User successfully registered"}), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error registering user", "error": str(error)}), 500
        return jsonify([]), 200

@api.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.json
        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            return jsonify({"msg": "Missing email parameter"}), 400
        if password is None:
            return jsonify({"msg": "Missing password parameter"}), 400

        user = User.query.filter_by(email=email).one_or_none()
        if user is not None:
            if check_password(user.password, password, user.salt):
                token = create_access_token(identity=user.id)
                return jsonify({"token": token, "name": user.name}), 200
            else:
                return jsonify({"msg": "Bad credentials"}), 400
        return jsonify({"msg": "Bad credentials"}), 400
    
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_info():
    if request.method == "GET":
        user = User.query.filter_by(id=get_jwt_identity()).first()

        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    
@api.route('/rack', methods=['POST'])
@jwt_required()
def add_rack():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        data_form = request.form
        
        data = {
            "brand": data_form.get("brand"),
            "model": data_form.get("model"),
            "serial": data_form.get("serial"),
            "number_part": data_form.get("number_part"),
            "componentType":data_form.get("componentType"),
            "service": data_form.get("service"),
            "five_years_prevition": data_form.get("five_years_prevition"),
            "contract": data_form.get("contract"),
            "observations": data_form.get("observations"),
            "has_cabinet": data_form.get("has_cabinet").lower() == "si", 
            "leased": data_form.get("leased").lower() == "si",
            "total_cabinets": data_form.get("total_cabinets"),
            "open_closed": data_form.get("open_closed").lower() == "abierto",
            "security": data_form.get("security").lower() == "si",
            "type_security": data_form.get("type_security"),
            "has_extractors": data_form.get("has_extractors").lower() == "si",
            "extractors_ubication": data_form.get("extractors_ubication"),
            "modular": data_form.get("modular").lower() == "si",
            "lateral_doors": data_form.get("lateral_doors").lower() == "si",
            "lateral_ubication": data_form.get("lateral_ubication"),
            "rack_unit": data_form.get("rack_unit"),
            "rack_position": data_form.get("rack_position"),
            "has_accessory": data_form.get("has_accessory").lower() == "si",
            "accessory_description": data_form.get("accessory_description"),
            "rack_width": data_form.get("rack_width"),
            "rack_length": data_form.get("rack_length"),
            "rack_height": data_form.get("rack_height"),
            "internal_pdu": data_form.get("internal_pdu"),
            "input_connector": data_form.get("input_connector"),
            "fases": data_form.get("fases"),
            "output_connector": data_form.get("output_connector"),
            "neutro": data_form.get("neutro"),
            "client": data_form.get("client")
        }
        if data.get("brand") is None:
            return jsonify ({"msg": "Missing brand parameter"}), 400
        if data.get("model") is None:
            return jsonify ({"msg": "Missing model parameter"}), 400
        if data.get("serial") is None:
            return jsonify ({"msg": "Missing serial parameter"}), 400
        
        # Create a new Client instance
        new_client = Client(
            clientName=data_form.get('clientName')
            )
        db.session.add(new_client)
        db.session.commit()
        
        new_description = Description(
            brand=data.get("brand"),
            model=data.get('model'),
            serial=data.get('serial'),
            number_part=data.get('number_part'),
            service=data.get('service'),
            five_years_prevition=data.get('five_years_prevition'),
            observations=data.get('observations'),
            contract=data.get('contract'),
            clientName=data.get('clientName'),
            componentType=data.get('componentType')
        )
        db.session.add(new_description)
        db.session.commit()
        # Crear una instancia de Rack con los datos recibidos
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
    
@api.route('/equipment', methods=['POST'])
@jwt_required()
def add_equipment():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        data_form = request.form

        data={
            'brand': data_form.get('brand'),
            'model': data_form.get('model'),
            'serial_number': data_form.get('serial_number'),
            "number_part":data_form.get("number_part"),
            "componentType":data_form.get("componentType"),
            "service":data_form.get("service"),
            "five_years_prevition":data_form.get("five_years_prevition"),
            "contract":data_form.get("contract"),
            "observations":data_form.get("observations"),
            'equipment_width':data_form.get('equipment_width'),
            'equipment_height':data_form.get('equipment_height'),
            'equipment_length':data_form.get('equipment_length'),
            'packaging_width':data_form.get('packaging_width'),
            'packaging_length':data_form.get('packaging_length'),
            'packaging_height':data_form.get('packaging_height'),
            'weight':data_form.get('weight'),
            'anchor_type':data_form.get('anchor_type'),
            'service_area':data_form.get('service_area'),
            'access_width':data_form.get('access_width'),
            'access_inclination':data_form.get('access_inclination'),
            'access_length':data_form.get('access_length'),
            'rack_number':data_form.get('rack_number'),
            'rack_unit_position':data_form.get('rack_unit_position'),
            'total_rack_units':data_form.get('total_rack_units'),
            'ac_dc':data_form.get('ac_dc'),
            'input_current':data_form.get('input_current'),
            'power':data_form.get('power'),
            'power_supply':data_form.get('power_supply'),
            'operation_temp':data_form.get('operation_temp'),
            'thermal_disipation':data_form.get('thermal_disipation'),
            'power_config':data_form.get('power_config')
        }
        # Create a new Client instance
        new_client = Client(
            clientName=data_form.get('clientName')
            )
        db.session.add(new_client)
        db.session.commit()
        
        # Crear una instancia de Description con los datos recibidos
        new_description = Description(
            brand=data_form.get("brand"),
            model=data_form.get('model'),
            serial=data_form.get('serial'),
            number_part=data_form.get('number_part'),
            service=data_form.get('service'),
            five_years_prevition=data_form.get('five_years_prevition'),
            observations=data_form.get('observations'),
            contract=data_form.get('contract'),
            clientName=data_form.get('clientName'),
            componentType=data_form.get('componentType')
            
        )

        # Agregar la nueva descripción a la sesión de la base de datos
        db.session.add(new_description)
        db.session.commit()

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
            total_rack_units=data.get('total_rack_units'),
            ac_dc=data.get('ac_dc'),
            input_current=data.get('input_current'),
            power=data.get('power'),
            power_supply=data.get('power_supply'),
            operation_temp=data.get('operation_temp'),
            thermal_disipation=data.get('thermal_disipation'),
            power_config=data.get('power_config'),
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
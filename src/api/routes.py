"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Equipment, Description
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/addRack', methods=['POST'])
def add_rack():
    try:
        # Obtener los datos del formulario en el cuerpo de la solicitud
        data = request.json

        # Crear una instancia de Rack con los datos recibidos
        new_rack = Rack(
            has_cabinet=data['has_cabinet'],
            leased=data['leased'],
            total_cabinets=data['total_cabinets'],
            # Agregar más campos según la estructura de Rack
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
            # Agregar más campos según la estructura de Equipment
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
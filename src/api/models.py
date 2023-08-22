from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    #is_active = db.Column(db.Boolean(), unique=False)
    coordination = db.Column(db.String(120), nullable=False)
    salt = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=db.func.current_timestamp(), default=db.func.current_timestamp())
    admin = db.Column(db.Boolean())
    
    # Relación con Clientes (un usuario puede tener varios clientes)
    clients= db.relationship('Client', backref='user', uselist=True, lazy=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "coordination": self.coordination,
            "username": self.username,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "admin": self.admin
            # do not serialize the password, its a security breach
        }


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clientName = db.Column(db.String(255), nullable=False)
    user_id =db.Column(db.Integer, db.ForeignKey('user.id'))
    
    # Relación con el usuario propietario (un cliente pertenece a un usuario)
    #user = db.relationship('User', back_populates='clients', lazy=False)
    
    # Relación con Racks (un cliente puede tener muchos racks)
    racks = db.relationship('Rack', backref='client', lazy=True)
    
    # Relación con Equipos (un cliente puede tener muchos equipos)
    equipments = db.relationship('Equipment', backref='client', lazy=True)
    
    def __repr__(self):
        return f'<Client {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "clientName": self.clientName,
            "user":self.user.serialize()
        }

class Description(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(120), nullable=False)
    model = db.Column(db.String(120), nullable=False)
    serial = db.Column(db.String(120), unique=False, nullable=False)
    number_part = db.Column(db.String(120))
    service = db.Column(db.String(120), nullable=False)
    five_years_prevition = db.Column(db.String(255))
    observations = db.Column(db.String(255))
    contract = db.Column(db.String(100))
    componentType = db.Column(db.String(100))
    
    # Relaciones con Rack y Equipment (un equipo y un rack tienen una descripción)
    rack = db.relationship('Rack', uselist=False, back_populates='description')
    equipment = db.relationship('Equipment', uselist=False, back_populates='description')
    
    def __repr__(self):
        return f'<Description {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'brand': self.brand,
            'model': self.model,
            'serial': self.serial,
            'number_part': self.number_part,
            'service': self.service,
            'five_years_prevition': self.five_years_prevition,
            'contract': self.contract,
            'observations': self.observations,
            'componentType': self.componentType,
            
        }

class Rack(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    has_cabinet = db.Column(db.String(10))
    leased = db.Column(db.Boolean())
    total_cabinets = db.Column(db.String(10))
    open_closed = db.Column(db.Boolean())
    security = db.Column(db.Boolean())
    type_security = db.Column(db.String(120))
    has_extractors = db.Column(db.Boolean())
    extractors_ubication = db.Column(db.String(120))
    modular = db.Column(db.Boolean())
    lateral_doors = db.Column(db.Boolean())
    lateral_ubication = db.Column(db.String(120))
    rack_unit = db.Column(db.Integer)
    rack_position = db.Column(db.String(120))
    has_accessory = db.Column(db.Boolean())
    accessory_description = db.Column(db.String(255))
    rack_width = db.Column(db.String(120))
    rack_length = db.Column(db.String(120))
    rack_height = db.Column(db.String(120))
    internal_pdu = db.Column(db.Integer)
    input_connector = db.Column(db.String(100))
    fases = db.Column(db.String(10))
    output_connector = db.Column(db.String(100))
    neutro = db.Column(db.Boolean())
    
    description_id = db.Column(db.Integer, db.ForeignKey('description.id'), nullable=False)
    description = db.relationship('Description', uselist=False, back_populates='rack')
    
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    
    # Relación con Equipos (un rack puede tener varios equipos)
    equipments = db.relationship('Equipment', backref='rack')
    
    def __repr__(self):
        return f'<Rack {self.id}>'
    
    def serialize(self):
        return{
            'id':self.id,
            'has_cabinets':self.has_cabinet,
            'leased':self.leased,
            'total_cabinets':self.total_cabinets,
            'open_closed':self.open_closed,
            'security':self.security,
            'type_security':self.type_security,
            'has_extractors':self.has_extractors,
            'extractors_ubication':self.extractors_ubication,
            'modular':self.modular,
            'lateral_doors':self.lateral_doors,
            'lateral_ubication':self.lateral_ubication,
            'rack_unit':self.rack_unit,
            'rack_position':self.rack_position,
            'has_accesory':self.has_accessory,
            'accesory_description':self.accessory_description,
            'rack_width':self.rack_width,
            'rack_length':self.rack_length,
            'rack_height':self.rack_height,
            'internal_pdu':self.internal_pdu,
            'input_connector':self.input_connector,
            'fases':self.fases,
            'output_connector':self.output_connector,
            'neutro':self.neutro,
            'description':self.description.serialize(),
            'client': self.client.serialize() if self.client else None 
        }
        
class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    equipment_width = db.Column(db.String(120))
    equipment_height = db.Column(db.String(120))
    equipment_length = db.Column(db.String(120))
    packaging_width = db.Column(db.String(120))
    packaging_length = db.Column(db.String(120))
    packaging_height = db.Column(db.String(120))
    weight = db.Column(db.String(120))
    anchor_type = db.Column(db.String(120))
    service_area = db.Column(db.Boolean())
    service_frontal = db.Column(db.Boolean())
    service_back = db.Column(db.Boolean())
    service_lateral = db.Column(db.Boolean())  
    access_width = db.Column(db.String(120))
    access_inclination = db.Column(db.String(120))
    access_length = db.Column(db.String(120))
    rack_number = db.Column(db.String(10))
    rack_unit_position = db.Column(db.String(120))
    total_rack_units = db.Column(db.Integer)
    ac_dc = db.Column(db.String(10))
    input_current = db.Column(db.String(50))
    power = db.Column(db.String(20))
    power_supply = db.Column(db.String(20))
    operation_temp = db.Column(db.String(20))
    thermal_disipation = db.Column(db.String(20))
    power_config = db.Column(db.String(20))
    
    description_id = db.Column(db.Integer, db.ForeignKey('description.id'), nullable=False)
    description = db.relationship('Description', uselist=False, back_populates='equipment')
    
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    
    # Relación con Rack (un equipo pertenece a un rack)
    rack_id = db.Column(db.Integer, db.ForeignKey('rack.id'), nullable=True)
    #rack = db.relationship('Rack', back_populates='equipments')
    
    def __repr__(self):
        return f'<Equipment {self.id}>'
    
    def serialize(self):
             return {
            'id': self.id,
            'equipment_width':self.equipment_width,
            'equipment_height':self.equipment_height,
            'equipment_length':self.equipment_length,
            'packaging_width':self.packaging_width,
            'packaging_length':self.packaging_length,
            'packaging_heigth':self.packaging_heigth,
            'weight':self.weight,
            "anchor_type":self.anchor_type,
            'service_area':self.service_area,
            'service_frontal': self.service_frontal,
            'service_back': self.service_back,
            'service_lateral': self.service_lateral,
            'access_width':self.access_width,
            'access_inclination':self.access_inclination,
            'access_length':self.access_length,
            'rack_unit_position':self.rack_unit_position,
            'total_rack_units':self.total_rack_units,
            'ac_dc':self.ac_dc,
            'input_current':self.input_current,
            'power':self.power,
            'power_supply':self.power_supply,
            'operation_temp':self.operation_temp,
            'thermal_disipation':self.thermal_disipation,
            'power_config':self.thermal_disipation,
            'description':self.description.serialize()
             }
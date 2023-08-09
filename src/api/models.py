from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    coordination =db.Column(db.String(120), nullable=False)
    salt=db.Column(db.String(100), unique=False, nullable=False)
    created_at= db.Column(db.DataTime, nullable=False, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "coordination":self.coordination,
            "name":self.name
            # do not serialize the password, its a security breach
        }

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(120),  nullable=False)
    model = db.Column(db.String(120),  nullable=False)
    serial = db.Column(db.String(120), unique=False, nullable=False)
    number_part = db.Column(db.String(120), nullable=False)
    service=db.Column(db.String(120),nullable=False)
    
    def __repr__(self):
        return f'<Equipment {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "brand": self.brand,
            "model": self.model,
            "serial": self.serial,
            "number_part": self.number_part,
            "service": self.service
        }

class Rack(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    has_cabinet=db.Column(db.Boolean())
    leased= db.Column(db.Boolean())
    total_cabinets=db.Column(db.String(10))
    open_closed=db.Column(db.Boolean())
    security=db.Column(db.Boolean())
    type_security=db.Column(db.String(120))
    has_extractors=db.Column(db.Boolean())
    extractors_ubication=db.Column(db.String(120))
    modular=db.Column(db.Boolean())
    lateral_doors=db.Column(db.Boolean())
    lateral_ubication=db.Column(db.String(120))
    rack_unit=db.Column(db.Integer)
    rack_position=db.Column(db.String(120))
    has_accessory = db.Column(db.Boolean)
    accessory_description = db.Column(db.String(255))
    rack_width = db.Column(db.Float)
    rack_length = db.Column(db.Float)
    rack_height = db.Column(db.Float)
    internal_pdu=db.Column(db.Integer)
    input_connector=db.Column(db.String(100))
    fases=db.Column(db.String(10))
    output_connector=db.Column(db.String(100))
    neutro=db.Column(db.Boolean())
    
    def __repr__(self):
        return f'<Rack {self.id}>'
    
    def serialize(self):
        return{
            'id':self.id,
            'has_cabinets':self.has_cabinets,
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
            
            
            
        }
    
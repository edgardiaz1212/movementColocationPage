"""empty message

Revision ID: 89534c9f2667
Revises: 
Create Date: 2023-08-18 19:13:54.616550

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89534c9f2667'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('description',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('brand', sa.String(length=120), nullable=False),
    sa.Column('model', sa.String(length=120), nullable=False),
    sa.Column('serial', sa.String(length=120), nullable=False),
    sa.Column('number_part', sa.String(length=120), nullable=True),
    sa.Column('service', sa.String(length=120), nullable=False),
    sa.Column('five_years_prevition', sa.String(length=255), nullable=True),
    sa.Column('observations', sa.String(length=255), nullable=True),
    sa.Column('contract', sa.String(length=100), nullable=True),
    sa.Column('componentType', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('coordination', sa.String(length=120), nullable=False),
    sa.Column('salt', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('client',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('clientName', sa.String(length=255), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rack',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('has_cabinet', sa.Boolean(), nullable=True),
    sa.Column('leased', sa.Boolean(), nullable=True),
    sa.Column('total_cabinets', sa.String(length=10), nullable=True),
    sa.Column('open_closed', sa.Boolean(), nullable=True),
    sa.Column('security', sa.Boolean(), nullable=True),
    sa.Column('type_security', sa.String(length=120), nullable=True),
    sa.Column('has_extractors', sa.Boolean(), nullable=True),
    sa.Column('extractors_ubication', sa.String(length=120), nullable=True),
    sa.Column('modular', sa.Boolean(), nullable=True),
    sa.Column('lateral_doors', sa.Boolean(), nullable=True),
    sa.Column('lateral_ubication', sa.String(length=120), nullable=True),
    sa.Column('rack_unit', sa.Integer(), nullable=True),
    sa.Column('rack_position', sa.String(length=120), nullable=True),
    sa.Column('has_accessory', sa.Boolean(), nullable=True),
    sa.Column('accessory_description', sa.String(length=255), nullable=True),
    sa.Column('rack_width', sa.String(length=120), nullable=True),
    sa.Column('rack_length', sa.String(length=120), nullable=True),
    sa.Column('rack_height', sa.String(length=120), nullable=True),
    sa.Column('internal_pdu', sa.Integer(), nullable=True),
    sa.Column('input_connector', sa.String(length=100), nullable=True),
    sa.Column('fases', sa.String(length=10), nullable=True),
    sa.Column('output_connector', sa.String(length=100), nullable=True),
    sa.Column('neutro', sa.Boolean(), nullable=True),
    sa.Column('description_id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.ForeignKeyConstraint(['description_id'], ['description.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('equipment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('equipment_width', sa.String(length=120), nullable=True),
    sa.Column('equipment_heigth', sa.String(length=120), nullable=True),
    sa.Column('equipment_length', sa.String(length=120), nullable=True),
    sa.Column('packaging_width', sa.String(length=120), nullable=True),
    sa.Column('packaging_length', sa.String(length=120), nullable=True),
    sa.Column('packaging_heigth', sa.String(length=120), nullable=True),
    sa.Column('weight', sa.String(length=120), nullable=True),
    sa.Column('anchor', sa.String(length=120), nullable=True),
    sa.Column('service_area', sa.Boolean(), nullable=True),
    sa.Column('service_frontal', sa.Boolean(), nullable=True),
    sa.Column('service_back', sa.Boolean(), nullable=True),
    sa.Column('service_lateral', sa.Boolean(), nullable=True),
    sa.Column('access_width', sa.String(length=120), nullable=True),
    sa.Column('access_inclination', sa.String(length=120), nullable=True),
    sa.Column('access_length', sa.String(length=120), nullable=True),
    sa.Column('rack_number', sa.String(length=10), nullable=True),
    sa.Column('rack_unit_position', sa.String(length=120), nullable=True),
    sa.Column('total_rack_units', sa.Integer(), nullable=True),
    sa.Column('ac_dc', sa.String(length=10), nullable=True),
    sa.Column('input_current', sa.String(length=50), nullable=True),
    sa.Column('power', sa.String(length=20), nullable=True),
    sa.Column('power_supply', sa.String(length=20), nullable=True),
    sa.Column('operation_temp', sa.String(length=20), nullable=True),
    sa.Column('thermal_disipation', sa.String(length=20), nullable=True),
    sa.Column('power_config', sa.String(length=20), nullable=True),
    sa.Column('description_id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('rack_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.ForeignKeyConstraint(['description_id'], ['description.id'], ),
    sa.ForeignKeyConstraint(['rack_id'], ['rack.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('equipment')
    op.drop_table('rack')
    op.drop_table('client')
    op.drop_table('user')
    op.drop_table('description')
    # ### end Alembic commands ###

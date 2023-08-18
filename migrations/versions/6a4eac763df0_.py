"""empty message

Revision ID: 6a4eac763df0
Revises: cc2d4bf255c0
Create Date: 2023-08-17 22:46:04.526973

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a4eac763df0'
down_revision = 'cc2d4bf255c0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('client', schema=None) as batch_op:
        batch_op.drop_constraint('client_clientName_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('client', schema=None) as batch_op:
        batch_op.create_unique_constraint('client_clientName_key', ['clientName'])

    # ### end Alembic commands ###
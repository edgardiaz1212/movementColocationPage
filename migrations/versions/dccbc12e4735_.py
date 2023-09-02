"""empty message

Revision ID: dccbc12e4735
Revises: 176284675119
Create Date: 2023-09-01 19:37:30.895854

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dccbc12e4735'
down_revision = '176284675119'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('description', schema=None) as batch_op:
        batch_op.alter_column('brand',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('model',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('serial',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('description', schema=None) as batch_op:
        batch_op.alter_column('serial',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.alter_column('model',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.alter_column('brand',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###

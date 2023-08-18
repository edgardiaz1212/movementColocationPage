"""empty message

Revision ID: b4c6d825b511
Revises: ca5bca3ed0a2
Create Date: 2023-08-11 17:50:14.677729

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b4c6d825b511'
down_revision = 'ca5bca3ed0a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rack', schema=None) as batch_op:
        batch_op.alter_column('client_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rack', schema=None) as batch_op:
        batch_op.alter_column('client_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
"""empty message

Revision ID: 2095a2b598b7
Revises: 
Create Date: 2019-01-11 03:22:10.748069

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2095a2b598b7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ticket',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ticket')
    # ### end Alembic commands ###

"""empty message

Revision ID: bbd64f2bfb21
Revises: ada2899b240f
Create Date: 2019-01-01 15:02:51.743261

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bbd64f2bfb21'
down_revision = 'ada2899b240f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('site', sa.String(), nullable=True),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=60), nullable=False),
    sa.Column('adminstatus', sa.Boolean(), nullable=True),
    sa.Column('sitelink', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sitelink'], ['sites.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.drop_table('user')
    op.alter_column('sites', 'sitename',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('sites', 'sitename',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.create_table('user',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('site', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('username', sa.VARCHAR(length=20), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(length=60), autoincrement=False, nullable=False),
    sa.Column('adminstatus', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('sitelink', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['sitelink'], ['sites.id'], name='user_sitelink_fkey'),
    sa.PrimaryKeyConstraint('id', name='user_pkey'),
    sa.UniqueConstraint('email', name='user_email_key'),
    sa.UniqueConstraint('username', name='user_username_key')
    )
    op.drop_table('users')
    # ### end Alembic commands ###
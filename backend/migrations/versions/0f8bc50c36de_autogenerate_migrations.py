"""autogenerate migrations

Revision ID: 0f8bc50c36de
Revises: fa315ec5d9dc
Create Date: 2022-08-03 13:44:58.545381

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0f8bc50c36de'
down_revision = 'fa315ec5d9dc'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('password', sa.String(length=255), nullable=False))
    op.drop_column('users', 'hashed_password')
    op.drop_column('users', 'type')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('type', mysql.ENUM('admin', 'basic'), nullable=True))
    op.add_column('users', sa.Column('hashed_password', mysql.VARCHAR(length=100), nullable=False))
    op.drop_column('users', 'password')
    # ### end Alembic commands ###
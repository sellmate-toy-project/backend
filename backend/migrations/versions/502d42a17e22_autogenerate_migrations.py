"""autogenerate migrations

Revision ID: 502d42a17e22
Revises: 4a0a731b0f37
Create Date: 2022-08-15 09:53:56.360187

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '502d42a17e22'
down_revision = '4a0a731b0f37'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'name',
                    existing_type=sa.String(length=100),
                    type_=sa.String(length=1000),
                    existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'name',
                    existing_type=sa.String(length=1000),
                    type_=sa.String(length=100),
                    existing_nullable=False)
    # ### end Alembic commands ###
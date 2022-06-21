from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from db.base_class import Base


class ProductLike(Base):
    __tablename__ = "product_likes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    
    user = relationship("User", back_populates="product_likes")
    product = relationship("Product", back_populates="product_likes")

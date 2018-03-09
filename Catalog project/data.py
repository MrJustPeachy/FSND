from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Base, Category, CategoryItem, User

engine = create_engine('sqlite:///catalogwebsite.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# This file instantiates the different categories,
# allowing users to create new ones
# once they authenticate to the server.

user1 = User(name="Dillon", email="test@gmail.com")
session.add(user1)
session.commit()

# Add soccer category
category1 = Category(name="Soccer")
session.add(category1)
session.commit()

categoryitem = CategoryItem(name="Cleats",
                            description="Gives you traction on the field!",
                            category=category1,
                            user_id=user1.id)
session.add(categoryitem)
session.commit()

# Add basketball category
category2 = Category(name="Basketball")
session.add(category2)
session.commit()

# Add baseball category
category3 = Category(name="Baseball")
session.add(category3)
session.commit()

# Add frisbee category
category4 = Category(name="Frisbee")
session.add(category4)
session.commit()

# Add snowboarding category
category5 = Category(name="Snowboarding")
session.add(category5)
session.commit()

# Add rock climbing category
category6 = Category(name="Rock climbing")
session.add(category6)
session.commit()

# Add foosball category
category7 = Category(name="Foosball")
session.add(category7)
session.commit()

# Add skating category
category8 = Category(name="Skating")
session.add(category8)
session.commit()

# Add hockey category
category9 = Category(name="Hockey")
session.add(category9)
session.commit()


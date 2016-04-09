class Region < ActiveRecord::Base 
	has_many :cities
  attr_accessible :name
end

class User < ApplicationRecord
  # brings brcypt awesomeness to the user model
  has_secure_password
  
  #establishes relationship to other models
  has_many :playlists

   #adds validations for the date saved to the user table
  validates :username, uniqueness: true
end

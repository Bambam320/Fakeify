class User < ApplicationRecord
  # brings brcypt awesomeness to the user model
  has_secure_password
  
  #establishes relationship to other models
  has_many :playlists

   #adds validations for the date saved to the user table
  validates :username, uniqueness: true
  validates :username, length: { minimum: 3 }
  validates :password, length: { in: 6..20 }
  validates :username, :email, :birthdate, :region, :avatar_url, presence: true
end

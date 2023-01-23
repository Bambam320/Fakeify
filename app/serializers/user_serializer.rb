class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :birthdate, :region, :avatar_url, :spotify_token, :spotify_refresh_token, :spotify_token_lifetime, :spotify_display_name, :spotify_email, :spotify_id, :spotify_img
  has_many :playlists
end

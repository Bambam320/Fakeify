class PlaylistSerializer < ActiveModel::Serializer
  # active storage update
  include Rails.application.routes.url_helpers

  attributes :id, :user_id, :name, :description, :spotify_id, :type_of_playlist, :image_url
  has_many :songs
  belongs_to :user

  # active storage update
  # def cover_blob
  #   rails_blob_path(object.cover_blob, only_path: true) if object.cover_blob.attached?
  # end
end

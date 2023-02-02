class AddSpotifyIdToSongsTable < ActiveRecord::Migration[7.0]
  def change
    add_column :songs, :spotify_id, :string
  end
end

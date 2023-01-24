class AddSpotifyBirthdateAndSpotifyRegionToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :spotify_birthdate, :string
    add_column :users, :spotify_region, :string
  end
end

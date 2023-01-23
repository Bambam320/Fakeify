class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.integer :artist_id
      t.string :name
      t.text :release_date
      t.string :spotify_artist_id
      t.string :artist_name
      t.integer :total_tracks
      t.string :image_url
      t.string :spotify_id
      t.timestamps
    end
  end
end
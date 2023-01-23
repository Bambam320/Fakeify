class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.integer :album_id
      t.integer :playlist_id
      t.integer :artist_id
      t.string :featured_artist
      t.text :release_date
      t.string :name
      t.string :genre
      t.string :spotify_playlist_id
      t.string :spotify_album_id
      t.string :spotify_artist_id
      t.string :preview_url
      t.string :cover_art
      t.timestamps
    end
  end
end
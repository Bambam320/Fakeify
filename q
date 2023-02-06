
[1mFrom:[0m /home/bambam/development/code/capstone/spotify-app/spotify-app/app/controllers/songs_controller.rb:31 SongsController#create:

    [1;34m21[0m: [32mdef[0m [1;34mcreate[0m
    [1;34m22[0m:   playlist = [1;34;4mPlaylist[0m.find(song_params[[33m:playlist_id[0m])
    [1;34m23[0m:   artist = [1;34;4mArtist[0m.find_or_create_by([35mspotify_id[0m: song_params[[33m:spotify_artist_id[0m])
    [1;34m24[0m:   artist.update_artist
    [1;34m25[0m:   album = [1;34;4mAlbum[0m.find_or_create_by(
    [1;34m26[0m:     [35mspotify_id[0m: song_params[[33m:spotify_album_id[0m],
    [1;34m27[0m:     [35martist_id[0m: artist.id
    [1;34m28[0m:   )
    [1;34m29[0m:   album.update_album
    [1;34m30[0m:   byebug
 => [1;34m31[0m:   updated_song_params = song_params.clone
    [1;34m32[0m:   updated_song_params[[31m[1;31m"[0m[31martist_id[1;31m"[0m[31m[0m] = artist.id
    [1;34m33[0m:   updated_song_params[[31m[1;31m"[0m[31malbum_id[1;31m"[0m[31m[0m] = album.id
    [1;34m34[0m:   song = playlist.songs.create!(updated_song_params)
    [1;34m35[0m:   render [35mjson[0m: song, [35mstatus[0m: [33m:created[0m
    [1;34m36[0m: [32mend[0m


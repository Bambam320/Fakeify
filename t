
[1mFrom:[0m /home/bambam/development/code/capstone/spotify-app/spotify-app/app/controllers/spotify_api_controller.rb:67 SpotifyApiController#new_playlist:

    [1;34m56[0m: [32mdef[0m [1;34mnew_playlist[0m
    [1;34m57[0m:   spotify_user = [1;34;4mRSpotify[0m::[1;34;4mUser[0m.new({
    [1;34m58[0m:     [31m[1;31m'[0m[31mcredentials[1;31m'[0m[31m[0m => {
    [1;34m59[0m:       [31m[1;31m"[0m[31mtoken[1;31m"[0m[31m[0m => params[[33m:spotify_token[0m],
    [1;34m60[0m:       [31m[1;31m"[0m[31mrefresh_token[1;31m"[0m[31m[0m => params[[33m:spotify_refresh_token[0m],
    [1;34m61[0m:     },
    [1;34m62[0m:     [31m[1;31m'[0m[31mid[1;31m'[0m[31m[0m => params[[33m:spotify_id[0m]
    [1;34m63[0m:   })
    [1;34m64[0m:   new_playlist = spotify_user.create_playlist!(params[[33m:playlists[0m][[33m:name[0m])
    [1;34m65[0m:   song_id_array = params[[33m:playlists[0m][[33m:songs[0m].map{|song| song[[33m:spotify_id[0m]}.filter{|id| !id.nil?}
    [1;34m66[0m:   byebug
 => [1;34m67[0m:   [32mif[0m filled_playlist = new_playlist.add_tracks!(song_id_array) 
    [1;34m68[0m:     render [35mjson[0m: {[35mmessage[0m: [[31m[1;31m"[0m[31m#{params[:playlists][:name]}[0m[31m has been succesfully added to your spotify account, #{params[:spotify_display_name]}[0m[31m[1;31m"[0m[31m[0m]}, [35mstatus[0m: [33m:created[0m
    [1;34m69[0m:   [32melse[0m 
    [1;34m70[0m:     render [35mjson[0m: {[35merror[0m: [[31m[1;31m"[0m[31mA failure has occured while adding playlist #{params[:playlists][:name]}[0m[31m, please try again![1;31m"[0m[31m[0m]}, [35mstatus[0m: [33m:bad_request[0m
    [1;34m71[0m:   [32mend[0m
    [1;34m72[0m: [32mend[0m


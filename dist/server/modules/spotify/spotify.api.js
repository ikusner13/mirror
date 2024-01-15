"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeShows = exports.putMeShows = exports.getMeShows = exports.getMeEpisodesContains = exports.deleteMeEpisodes = exports.putMeEpisodes = exports.getMeEpisodes = exports.getMeTracksContains = exports.deleteMeTracks = exports.putMeTracks = exports.getMeTracks = exports.getMeAlbumsContains = exports.deleteMeAlbums = exports.putMeAlbums = exports.getMeAlbums = exports.getMePlaylists = exports.deletePlaylistsByPlaylistIdTracks = exports.putPlaylistsByPlaylistIdTracks = exports.postPlaylistsByPlaylistIdTracks = exports.getPlaylistsByPlaylistIdTracks = exports.putPlaylistsByPlaylistId = exports.getPlaylistsByPlaylistId = exports.getMe = exports.search = exports.getTracks = exports.getTracksById = exports.getChapters = exports.getChaptersById = exports.getMeAudiobooksContains = exports.deleteMeAudiobooks = exports.putMeAudiobooks = exports.getMeAudiobooks = exports.getAudiobooksByIdChapters = exports.getAudiobooks = exports.getAudiobooksById = exports.getEpisodes = exports.getEpisodesById = exports.getShowsByIdEpisodes = exports.getShows = exports.getShowsById = exports.getArtistsByIdRelatedArtists = exports.getArtistsByIdTopTracks = exports.getArtistsByIdAlbums = exports.getArtists = exports.getArtistsById = exports.getAlbumsByIdTracks = exports.getAlbums = exports.getAlbumsById = exports.servers = exports.defaults = void 0;
exports.getMeTopTracks = exports.getMeTopArtists = exports.getMarkets = exports.postMePlayerQueue = exports.getMePlayerQueue = exports.getMePlayerRecentlyPlayed = exports.putMePlayerShuffle = exports.putMePlayerVolume = exports.putMePlayerRepeat = exports.putMePlayerSeek = exports.postMePlayerPrevious = exports.postMePlayerNext = exports.putMePlayerPause = exports.putMePlayerPlay = exports.getMePlayerCurrentlyPlaying = exports.getMePlayerDevices = exports.putMePlayer = exports.getMePlayer = exports.getRecommendationsAvailableGenreSeeds = exports.getRecommendations = exports.getAudioAnalysisById = exports.getAudioFeaturesById = exports.getAudioFeatures = exports.getPlaylistsByPlaylistIdFollowersContains = exports.getMeFollowingContains = exports.deleteMeFollowing = exports.putMeFollowing = exports.getMeFollowing = exports.getBrowseNewReleases = exports.putPlaylistsByPlaylistIdImages = exports.getPlaylistsByPlaylistIdImages = exports.getBrowseCategoriesByCategoryIdPlaylists = exports.getBrowseCategoriesByCategoryId = exports.getBrowseCategories = exports.getBrowseFeaturedPlaylists = exports.deletePlaylistsByPlaylistIdFollowers = exports.putPlaylistsByPlaylistIdFollowers = exports.postUsersByUserIdPlaylists = exports.getUsersByUserIdPlaylists = exports.getUsersByUserId = exports.getMeShowsContains = void 0;
// @ts-nocheck
/**
 * Spotify Web API with fixes and improvements from sonallux
 * 2023.12.2
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
const Oazapfts = __importStar(require("oazapfts/lib/runtime"));
const QS = __importStar(require("oazapfts/lib/runtime/query"));
exports.defaults = {
    baseUrl: "https://api.spotify.com/v1",
};
const oazapfts = Oazapfts.runtime(exports.defaults);
exports.servers = {
    server1: "https://api.spotify.com/v1",
};
/**
 * Get Album
 *
 */
function getAlbumsById(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/albums/${encodeURIComponent(id)}${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getAlbumsById = getAlbumsById;
/**
 * Get Several Albums
 *
 */
function getAlbums(ids, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/albums${QS.query(QS.explode({
        ids,
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getAlbums = getAlbums;
/**
 * Get Album Tracks
 *
 */
function getAlbumsByIdTracks(id, { market, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/albums/${encodeURIComponent(id)}/tracks${QS.query(QS.explode({
        market,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getAlbumsByIdTracks = getAlbumsByIdTracks;
/**
 * Get Artist
 *
 */
function getArtistsById(id, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/artists/${encodeURIComponent(id)}`, {
        ...opts,
    }));
}
exports.getArtistsById = getArtistsById;
/**
 * Get Several Artists
 *
 */
function getArtists(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/artists${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getArtists = getArtists;
/**
 * Get Artist's Albums
 *
 */
function getArtistsByIdAlbums(id, { includeGroups, market, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/artists/${encodeURIComponent(id)}/albums${QS.query(QS.explode({
        include_groups: includeGroups,
        market,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getArtistsByIdAlbums = getArtistsByIdAlbums;
/**
 * Get Artist's Top Tracks
 *
 */
function getArtistsByIdTopTracks(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/artists/${encodeURIComponent(id)}/top-tracks${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getArtistsByIdTopTracks = getArtistsByIdTopTracks;
/**
 * Get Artist's Related Artists
 *
 */
function getArtistsByIdRelatedArtists(id, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/artists/${encodeURIComponent(id)}/related-artists`, {
        ...opts,
    }));
}
exports.getArtistsByIdRelatedArtists = getArtistsByIdRelatedArtists;
/**
 * Get Show
 *
 */
function getShowsById(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/shows/${encodeURIComponent(id)}${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getShowsById = getShowsById;
/**
 * Get Several Shows
 *
 */
function getShows(ids, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/shows${QS.query(QS.explode({
        market,
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getShows = getShows;
/**
 * Get Show Episodes
 *
 */
function getShowsByIdEpisodes(id, { market, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/shows/${encodeURIComponent(id)}/episodes${QS.query(QS.explode({
        market,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getShowsByIdEpisodes = getShowsByIdEpisodes;
/**
 * Get Episode
 *
 */
function getEpisodesById(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/episodes/${encodeURIComponent(id)}${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getEpisodesById = getEpisodesById;
/**
 * Get Several Episodes
 *
 */
function getEpisodes(ids, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/episodes${QS.query(QS.explode({
        ids,
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getEpisodes = getEpisodes;
/**
 * Get an Audiobook
 *
 */
function getAudiobooksById(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/audiobooks/${encodeURIComponent(id)}${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getAudiobooksById = getAudiobooksById;
/**
 * Get Several Audiobooks
 *
 */
function getAudiobooks(ids, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/audiobooks${QS.query(QS.explode({
        ids,
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getAudiobooks = getAudiobooks;
/**
 * Get Audiobook Chapters
 *
 */
function getAudiobooksByIdChapters(id, { market, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/audiobooks/${encodeURIComponent(id)}/chapters${QS.query(QS.explode({
        market,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getAudiobooksByIdChapters = getAudiobooksByIdChapters;
/**
 * Get User's Saved Audiobooks
 *
 */
function getMeAudiobooks({ limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/audiobooks${QS.query(QS.explode({
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMeAudiobooks = getMeAudiobooks;
/**
 * Save Audiobooks for Current User
 *
 */
function putMeAudiobooks(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/audiobooks${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
        method: "PUT",
    }));
}
exports.putMeAudiobooks = putMeAudiobooks;
/**
 * Remove User's Saved Audiobooks
 *
 */
function deleteMeAudiobooks(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/audiobooks${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
        method: "DELETE",
    }));
}
exports.deleteMeAudiobooks = deleteMeAudiobooks;
/**
 * Check User's Saved Audiobooks
 *
 */
function getMeAudiobooksContains(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/audiobooks/contains${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getMeAudiobooksContains = getMeAudiobooksContains;
/**
 * Get a Chapter
 *
 */
function getChaptersById(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/chapters/${encodeURIComponent(id)}${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getChaptersById = getChaptersById;
/**
 * Get Several Chapters
 *
 */
function getChapters(ids, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/chapters${QS.query(QS.explode({
        ids,
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getChapters = getChapters;
/**
 * Get Track
 *
 */
function getTracksById(id, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/tracks/${encodeURIComponent(id)}${QS.query(QS.explode({
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getTracksById = getTracksById;
/**
 * Get Several Tracks
 *
 */
function getTracks(ids, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/tracks${QS.query(QS.explode({
        market,
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getTracks = getTracks;
/**
 * Search for Item
 *
 */
function search(q, $type, { market, limit, offset, includeExternal, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/search${QS.query(QS.explode({
        q,
        market,
        limit,
        offset,
        include_external: includeExternal,
    }), QS.form({
        type: $type,
    }))}`, {
        ...opts,
    }));
}
exports.search = search;
/**
 * Get Current User's Profile
 *
 */
function getMe(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/me", {
        ...opts,
    }));
}
exports.getMe = getMe;
/**
 * Get Playlist
 *
 */
function getPlaylistsByPlaylistId(playlistId, { market, fields, additionalTypes, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}${QS.query(QS.explode({
        market,
        fields,
        additional_types: additionalTypes,
    }))}`, {
        ...opts,
    }));
}
exports.getPlaylistsByPlaylistId = getPlaylistsByPlaylistId;
/**
 * Change Playlist Details
 *
 */
function putPlaylistsByPlaylistId(playlistId, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putPlaylistsByPlaylistId = putPlaylistsByPlaylistId;
/**
 * Get Playlist Items
 *
 */
function getPlaylistsByPlaylistIdTracks(playlistId, { market, fields, limit, offset, additionalTypes, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/tracks${QS.query(QS.explode({
        market,
        fields,
        limit,
        offset,
        additional_types: additionalTypes,
    }))}`, {
        ...opts,
    }));
}
exports.getPlaylistsByPlaylistIdTracks = getPlaylistsByPlaylistIdTracks;
/**
 * Add Items to Playlist
 *
 */
function postPlaylistsByPlaylistIdTracks(playlistId, body, { position, uris, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/tracks${QS.query(QS.explode({
        position,
        uris,
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body,
    })));
}
exports.postPlaylistsByPlaylistIdTracks = postPlaylistsByPlaylistIdTracks;
/**
 * Update Playlist Items
 *
 */
function putPlaylistsByPlaylistIdTracks(playlistId, body, { uris, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/tracks${QS.query(QS.explode({
        uris,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putPlaylistsByPlaylistIdTracks = putPlaylistsByPlaylistIdTracks;
/**
 * Remove Playlist Items
 *
 */
function deletePlaylistsByPlaylistIdTracks(playlistId, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/tracks`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body,
    })));
}
exports.deletePlaylistsByPlaylistIdTracks = deletePlaylistsByPlaylistIdTracks;
/**
 * Get Current User's Playlists
 *
 */
function getMePlaylists({ limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/playlists${QS.query(QS.explode({
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMePlaylists = getMePlaylists;
/**
 * Get User's Saved Albums
 *
 */
function getMeAlbums({ limit, offset, market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/albums${QS.query(QS.explode({
        limit,
        offset,
        market,
    }))}`, {
        ...opts,
    }));
}
exports.getMeAlbums = getMeAlbums;
/**
 * Save Albums for Current User
 *
 */
function putMeAlbums(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/albums${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMeAlbums = putMeAlbums;
/**
 * Remove Users' Saved Albums
 *
 */
function deleteMeAlbums(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/albums${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body,
    })));
}
exports.deleteMeAlbums = deleteMeAlbums;
/**
 * Check User's Saved Albums
 *
 */
function getMeAlbumsContains(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/albums/contains${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getMeAlbumsContains = getMeAlbumsContains;
/**
 * Get User's Saved Tracks
 *
 */
function getMeTracks({ market, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/tracks${QS.query(QS.explode({
        market,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMeTracks = getMeTracks;
/**
 * Save Tracks for Current User
 *
 */
function putMeTracks(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/tracks${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMeTracks = putMeTracks;
/**
 * Remove User's Saved Tracks
 *
 */
function deleteMeTracks(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/tracks${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body,
    })));
}
exports.deleteMeTracks = deleteMeTracks;
/**
 * Check User's Saved Tracks
 *
 */
function getMeTracksContains(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/tracks/contains${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getMeTracksContains = getMeTracksContains;
/**
 * Get User's Saved Episodes
 *
 */
function getMeEpisodes({ market, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/episodes${QS.query(QS.explode({
        market,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMeEpisodes = getMeEpisodes;
/**
 * Save Episodes for Current User
 *
 */
function putMeEpisodes(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/episodes${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMeEpisodes = putMeEpisodes;
/**
 * Remove User's Saved Episodes
 *
 */
function deleteMeEpisodes(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/episodes${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body,
    })));
}
exports.deleteMeEpisodes = deleteMeEpisodes;
/**
 * Check User's Saved Episodes
 *
 */
function getMeEpisodesContains(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/episodes/contains${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getMeEpisodesContains = getMeEpisodesContains;
/**
 * Get User's Saved Shows
 *
 */
function getMeShows({ limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/shows${QS.query(QS.explode({
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMeShows = getMeShows;
/**
 * Save Shows for Current User
 *
 */
function putMeShows(ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/shows${QS.query(QS.explode({
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMeShows = putMeShows;
/**
 * Remove User's Saved Shows
 *
 */
function deleteMeShows(ids, body, { market, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/shows${QS.query(QS.explode({
        ids,
        market,
    }))}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body,
    })));
}
exports.deleteMeShows = deleteMeShows;
/**
 * Check User's Saved Shows
 *
 */
function getMeShowsContains(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/shows/contains${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getMeShowsContains = getMeShowsContains;
/**
 * Get User's Profile
 *
 */
function getUsersByUserId(userId, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/users/${encodeURIComponent(userId)}`, {
        ...opts,
    }));
}
exports.getUsersByUserId = getUsersByUserId;
/**
 * Get User's Playlists
 *
 */
function getUsersByUserIdPlaylists(userId, { limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/users/${encodeURIComponent(userId)}/playlists${QS.query(QS.explode({
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getUsersByUserIdPlaylists = getUsersByUserIdPlaylists;
/**
 * Create Playlist
 *
 */
function postUsersByUserIdPlaylists(userId, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/users/${encodeURIComponent(userId)}/playlists`, oazapfts.json({
        ...opts,
        method: "POST",
        body,
    })));
}
exports.postUsersByUserIdPlaylists = postUsersByUserIdPlaylists;
/**
 * Follow Playlist
 *
 */
function putPlaylistsByPlaylistIdFollowers(playlistId, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/followers`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putPlaylistsByPlaylistIdFollowers = putPlaylistsByPlaylistIdFollowers;
/**
 * Unfollow Playlist
 *
 */
function deletePlaylistsByPlaylistIdFollowers(playlistId, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/followers`, {
        ...opts,
        method: "DELETE",
    }));
}
exports.deletePlaylistsByPlaylistIdFollowers = deletePlaylistsByPlaylistIdFollowers;
/**
 * Get Featured Playlists
 *
 */
function getBrowseFeaturedPlaylists({ country, locale, timestamp, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/browse/featured-playlists${QS.query(QS.explode({
        country,
        locale,
        timestamp,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getBrowseFeaturedPlaylists = getBrowseFeaturedPlaylists;
/**
 * Get Several Browse Categories
 *
 */
function getBrowseCategories({ country, locale, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/browse/categories${QS.query(QS.explode({
        country,
        locale,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getBrowseCategories = getBrowseCategories;
/**
 * Get Single Browse Category
 *
 */
function getBrowseCategoriesByCategoryId(categoryId, { country, locale, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/browse/categories/${encodeURIComponent(categoryId)}${QS.query(QS.explode({
        country,
        locale,
    }))}`, {
        ...opts,
    }));
}
exports.getBrowseCategoriesByCategoryId = getBrowseCategoriesByCategoryId;
/**
 * Get Category's Playlists
 *
 */
function getBrowseCategoriesByCategoryIdPlaylists(categoryId, { country, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/browse/categories/${encodeURIComponent(categoryId)}/playlists${QS.query(QS.explode({
        country,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getBrowseCategoriesByCategoryIdPlaylists = getBrowseCategoriesByCategoryIdPlaylists;
/**
 * Get Playlist Cover Image
 *
 */
function getPlaylistsByPlaylistIdImages(playlistId, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/images`, {
        ...opts,
    }));
}
exports.getPlaylistsByPlaylistIdImages = getPlaylistsByPlaylistIdImages;
/**
 * Add Custom Playlist Cover Image
 *
 */
function putPlaylistsByPlaylistIdImages(playlistId, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/images`, {
        ...opts,
        method: "PUT",
        body,
    }));
}
exports.putPlaylistsByPlaylistIdImages = putPlaylistsByPlaylistIdImages;
/**
 * Get New Releases
 *
 */
function getBrowseNewReleases({ country, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/browse/new-releases${QS.query(QS.explode({
        country,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getBrowseNewReleases = getBrowseNewReleases;
/**
 * Get Followed Artists
 *
 */
function getMeFollowing($type, { after, limit, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/following${QS.query(QS.explode({
        type: $type,
        after,
        limit,
    }))}`, {
        ...opts,
    }));
}
exports.getMeFollowing = getMeFollowing;
/**
 * Follow Artists or Users
 *
 */
function putMeFollowing($type, ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/following${QS.query(QS.explode({
        type: $type,
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMeFollowing = putMeFollowing;
/**
 * Unfollow Artists or Users
 *
 */
function deleteMeFollowing($type, ids, body, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/following${QS.query(QS.explode({
        type: $type,
        ids,
    }))}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body,
    })));
}
exports.deleteMeFollowing = deleteMeFollowing;
/**
 * Check If User Follows Artists or Users
 *
 */
function getMeFollowingContains($type, ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/following/contains${QS.query(QS.explode({
        type: $type,
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getMeFollowingContains = getMeFollowingContains;
/**
 * Check if Users Follow Playlist
 *
 */
function getPlaylistsByPlaylistIdFollowersContains(playlistId, ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/playlists/${encodeURIComponent(playlistId)}/followers/contains${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getPlaylistsByPlaylistIdFollowersContains = getPlaylistsByPlaylistIdFollowersContains;
/**
 * Get Tracks' Audio Features
 *
 */
function getAudioFeatures(ids, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/audio-features${QS.query(QS.explode({
        ids,
    }))}`, {
        ...opts,
    }));
}
exports.getAudioFeatures = getAudioFeatures;
/**
 * Get Track's Audio Features
 *
 */
function getAudioFeaturesById(id, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/audio-features/${encodeURIComponent(id)}`, {
        ...opts,
    }));
}
exports.getAudioFeaturesById = getAudioFeaturesById;
/**
 * Get Track's Audio Analysis
 *
 */
function getAudioAnalysisById(id, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/audio-analysis/${encodeURIComponent(id)}`, {
        ...opts,
    }));
}
exports.getAudioAnalysisById = getAudioAnalysisById;
/**
 * Get Recommendations
 *
 */
function getRecommendations({ limit, market, seedArtists, seedGenres, seedTracks, minAcousticness, maxAcousticness, targetAcousticness, minDanceability, maxDanceability, targetDanceability, minDurationMs, maxDurationMs, targetDurationMs, minEnergy, maxEnergy, targetEnergy, minInstrumentalness, maxInstrumentalness, targetInstrumentalness, minKey, maxKey, targetKey, minLiveness, maxLiveness, targetLiveness, minLoudness, maxLoudness, targetLoudness, minMode, maxMode, targetMode, minPopularity, maxPopularity, targetPopularity, minSpeechiness, maxSpeechiness, targetSpeechiness, minTempo, maxTempo, targetTempo, minTimeSignature, maxTimeSignature, targetTimeSignature, minValence, maxValence, targetValence, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/recommendations${QS.query(QS.explode({
        limit,
        market,
        seed_artists: seedArtists,
        seed_genres: seedGenres,
        seed_tracks: seedTracks,
        min_acousticness: minAcousticness,
        max_acousticness: maxAcousticness,
        target_acousticness: targetAcousticness,
        min_danceability: minDanceability,
        max_danceability: maxDanceability,
        target_danceability: targetDanceability,
        min_duration_ms: minDurationMs,
        max_duration_ms: maxDurationMs,
        target_duration_ms: targetDurationMs,
        min_energy: minEnergy,
        max_energy: maxEnergy,
        target_energy: targetEnergy,
        min_instrumentalness: minInstrumentalness,
        max_instrumentalness: maxInstrumentalness,
        target_instrumentalness: targetInstrumentalness,
        min_key: minKey,
        max_key: maxKey,
        target_key: targetKey,
        min_liveness: minLiveness,
        max_liveness: maxLiveness,
        target_liveness: targetLiveness,
        min_loudness: minLoudness,
        max_loudness: maxLoudness,
        target_loudness: targetLoudness,
        min_mode: minMode,
        max_mode: maxMode,
        target_mode: targetMode,
        min_popularity: minPopularity,
        max_popularity: maxPopularity,
        target_popularity: targetPopularity,
        min_speechiness: minSpeechiness,
        max_speechiness: maxSpeechiness,
        target_speechiness: targetSpeechiness,
        min_tempo: minTempo,
        max_tempo: maxTempo,
        target_tempo: targetTempo,
        min_time_signature: minTimeSignature,
        max_time_signature: maxTimeSignature,
        target_time_signature: targetTimeSignature,
        min_valence: minValence,
        max_valence: maxValence,
        target_valence: targetValence,
    }))}`, {
        ...opts,
    }));
}
exports.getRecommendations = getRecommendations;
/**
 * Get Available Genre Seeds
 *
 */
function getRecommendationsAvailableGenreSeeds(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/recommendations/available-genre-seeds", {
        ...opts,
    }));
}
exports.getRecommendationsAvailableGenreSeeds = getRecommendationsAvailableGenreSeeds;
/**
 * Get Playback State
 *
 */
function getMePlayer({ market, additionalTypes, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player${QS.query(QS.explode({
        market,
        additional_types: additionalTypes,
    }))}`, {
        ...opts,
    }));
}
exports.getMePlayer = getMePlayer;
/**
 * Transfer Playback
 *
 */
function putMePlayer(body, opts) {
    return oazapfts.ok(oazapfts.fetchJson("/me/player", oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMePlayer = putMePlayer;
/**
 * Get Available Devices
 *
 */
function getMePlayerDevices(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/me/player/devices", {
        ...opts,
    }));
}
exports.getMePlayerDevices = getMePlayerDevices;
/**
 * Get Currently Playing Track
 *
 */
function getMePlayerCurrentlyPlaying({ market, additionalTypes, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/currently-playing${QS.query(QS.explode({
        market,
        additional_types: additionalTypes,
    }))}`, {
        ...opts,
    }));
}
exports.getMePlayerCurrentlyPlaying = getMePlayerCurrentlyPlaying;
/**
 * Start/Resume Playback
 *
 */
function putMePlayerPlay(body, { deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/play${QS.query(QS.explode({
        device_id: deviceId,
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body,
    })));
}
exports.putMePlayerPlay = putMePlayerPlay;
/**
 * Pause Playback
 *
 */
function putMePlayerPause({ deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/pause${QS.query(QS.explode({
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "PUT",
    }));
}
exports.putMePlayerPause = putMePlayerPause;
/**
 * Skip To Next
 *
 */
function postMePlayerNext({ deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/next${QS.query(QS.explode({
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "POST",
    }));
}
exports.postMePlayerNext = postMePlayerNext;
/**
 * Skip To Previous
 *
 */
function postMePlayerPrevious({ deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/previous${QS.query(QS.explode({
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "POST",
    }));
}
exports.postMePlayerPrevious = postMePlayerPrevious;
/**
 * Seek To Position
 *
 */
function putMePlayerSeek(positionMs, { deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/seek${QS.query(QS.explode({
        position_ms: positionMs,
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "PUT",
    }));
}
exports.putMePlayerSeek = putMePlayerSeek;
/**
 * Set Repeat Mode
 *
 */
function putMePlayerRepeat(state, { deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/repeat${QS.query(QS.explode({
        state,
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "PUT",
    }));
}
exports.putMePlayerRepeat = putMePlayerRepeat;
/**
 * Set Playback Volume
 *
 */
function putMePlayerVolume(volumePercent, { deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/volume${QS.query(QS.explode({
        volume_percent: volumePercent,
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "PUT",
    }));
}
exports.putMePlayerVolume = putMePlayerVolume;
/**
 * Toggle Playback Shuffle
 *
 */
function putMePlayerShuffle(state, { deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/shuffle${QS.query(QS.explode({
        state,
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "PUT",
    }));
}
exports.putMePlayerShuffle = putMePlayerShuffle;
/**
 * Get Recently Played Tracks
 *
 */
function getMePlayerRecentlyPlayed({ limit, after, before, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/recently-played${QS.query(QS.explode({
        limit,
        after,
        before,
    }))}`, {
        ...opts,
    }));
}
exports.getMePlayerRecentlyPlayed = getMePlayerRecentlyPlayed;
/**
 * Get the User's Queue
 *
 */
function getMePlayerQueue(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/me/player/queue", {
        ...opts,
    }));
}
exports.getMePlayerQueue = getMePlayerQueue;
/**
 * Add Item to Playback Queue
 *
 */
function postMePlayerQueue(uri, { deviceId, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/player/queue${QS.query(QS.explode({
        uri,
        device_id: deviceId,
    }))}`, {
        ...opts,
        method: "POST",
    }));
}
exports.postMePlayerQueue = postMePlayerQueue;
/**
 * Get Available Markets
 *
 */
function getMarkets(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/markets", {
        ...opts,
    }));
}
exports.getMarkets = getMarkets;
/**
 * Get User's Top Artists
 *
 */
function getMeTopArtists({ timeRange, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/top/artists${QS.query(QS.explode({
        time_range: timeRange,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMeTopArtists = getMeTopArtists;
/**
 * Get User's Top Tracks
 *
 */
function getMeTopTracks({ timeRange, limit, offset, } = {}, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/me/top/tracks${QS.query(QS.explode({
        time_range: timeRange,
        limit,
        offset,
    }))}`, {
        ...opts,
    }));
}
exports.getMeTopTracks = getMeTopTracks;

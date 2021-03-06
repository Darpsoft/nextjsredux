import {
  SET_MUNICIPALITY,
  GET_FEATURES,
  GET_DEPARTMENTS,
  GET_LAST_LAWS,
  GET_LAST_NEWS,
  GET_POST,
  GET_POSTS_SUBCATEGORIES,
  GET_POSTS,
  SET_FEATURES,
  SET_DEPARTMENTS
} from './actionConstants';

// UPDATED
export const setMunicipalityAction = value => ({
  type: SET_MUNICIPALITY,
  value
})

// NEW
export const setFeaturesAction = (features, channels) => ({
  type: SET_FEATURES,
  features,
  channels
})

// NEW
export const setDepartmentsAction = departments => ({
  type: SET_DEPARTMENTS,
  departments
})

export const getFeaturesAction = (municipalityId) => ({
  type: GET_FEATURES,
  value: municipalityId,
});
export const getDepartmentsAction = (municipalityId) => ({
  type: GET_DEPARTMENTS,
  value: municipalityId,
});

export const getLastLawsAction = (municipalityId) => ({
  type: GET_LAST_LAWS,
  value: municipalityId,
});

export const getLastNewsAction = (municipalityId) => ({
  type: GET_LAST_NEWS,
  value: municipalityId,
});

export const getPostAction = (postId) => ({
  type: GET_POST,
  value: postId,
});

// posts

export const getPostSubCategoriesAction = (filter) => ({
  type: GET_POSTS_SUBCATEGORIES,
  value: filter,
});
export const filterPostsAction = (filter) => ({
  type: GET_POSTS,
  value: filter,
});

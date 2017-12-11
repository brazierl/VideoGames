import DS from 'ember-data';

export default DS.Model.extend({
  "name": DS.attr('string'),
  "slug": DS.attr('string'),
  "url": DS.attr('string'),
  "imageUrl": DS.attr('string'),
  "createdAt": DS.attr('date'),
  "updatedAt": DS.attr('date'),
  "releaseDate": DS.attr('date'),
  "rating": DS.attr('number'),
  "summary": DS.attr('string'),
  "shortSummary": DS.attr('string'),
  "themes": []
});

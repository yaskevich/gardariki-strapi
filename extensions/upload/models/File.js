'use strict';

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const publicPath = path.join(__dirname, '../../../public');
/**
 * Lifecycle callbacks for the `File` model.
 */

const getFileNamePreview = attrs => {
  return path.join(publicPath, 'uploads', 'pre', `${attrs.hash}${attrs.ext}`);
};

const getFileNameThumb = attrs => {
  return path.join(publicPath, 'uploads', 'thumb',`${attrs.hash}${attrs.ext}`);
};

module.exports = {
  afterSave: async model => {
    if (!model.attributes.mime.startsWith('image/')) return;

    const from = path.join(publicPath, model.attributes.url);
	console.log("img", from);
	// img /data/www/gardback/public/uploads/73d89413bbff4e06ba08a89fff23fea4.jpg

    const fileNamePreview = getFileNamePreview(model.attributes);
    const fileNameThumb = getFileNameThumb(model.attributes);
    try {
      await sharp(from).resize(640).toFile(fileNamePreview);
      await sharp(from).resize(200).toFile(fileNameThumb);
    } catch (err) {
      strapi.log.error(err);
    }
  }
}
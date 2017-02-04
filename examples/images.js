const path = require( 'path' ),
	fsp = require( 'fs-promise' ),
	parser = require( '../src' ),
	CommandModel = require( '../src/rtf/model/Command' ),
	PictureModel = require( '../src/rtf/model/command/Picture' ),
	TextModel = require( '../src/rtf/model/Text' );

// This example shows how to traverse the document, and work with pictures.
// It's loading RTF file pointed by `rtfPath` and saves each image to `outputPath` directory.

let rtfPath = path.join( __dirname, 'rtf', 'images.rtf' ),
	ouputPath = './_output';

parser.parseFile( rtfPath )
	.then( doc => {
		// File parsed, doc is a Document instance.
		// Now get all the picture instances:
		let pics = doc.getChildren( PictureModel, true );

		console.log( `Found ${pics.length} pictures, saving to ${ouputPath} directory...` );

		return pics;
	} )
	.then( pics => {
		// Save each picture as a file in the output directory.
		return Promise.all( pics.map( ( pict, index ) =>
			fsp.writeFile( `_output/img${index}.png`, pict.getPicture() ) ) );
	} )
	.then( () => console.log( 'And I\'m done!' ) );

<?php

$dirAlbums = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR."albums".DIRECTORY_SEPARATOR;
$json = null;

if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];    
    //$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = $dirAlbums."tmp".DIRECTORY_SEPARATOR.$_FILES[ 'file' ][ 'name' ];

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer);    
    
} else {    
    echo "terms:".(!empty($_POST['file']));
        
    if (!empty($_POST['file']) && !empty($_POST['status']))
    {
        $status = json_decode($_POST['status']);
        
        if ($status->remove)
        {
            $dir = $status->album == false ? "tmp" : $status->album;
            //remove images
            if (unlink( $dirAlbums.$dir.DIRECTORY_SEPARATOR.$filename)) {
                $answer = array( 'answer' => 'File '.$_POST['file'].' is removed');
                $json = json_encode( $answer);    
            }

        }
    }

}

    echo $json;

?>
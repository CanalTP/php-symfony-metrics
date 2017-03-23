<?php
    $files = array_diff(scandir('data'), ['..', '.']);
    $stats = [];
    foreach($files as $idx => $file) {
        if(md5_file('data/' . $file) == md5_file('data/' . $files[$idx+1])) {
            echo "removing $file";
            unlink('data/' . $file);
        }
    }
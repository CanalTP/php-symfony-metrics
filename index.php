<?php
$files = array_diff(scandir('data'), ['..', '.']);
$stats = [];
foreach($files as $file) {
    $dataResults = json_decode(file_get_contents('./data/' . $file), true);
    if(!preg_match('/^logs-(\d{4}-\d{2}-\d{2}).json$/', $file, $matches)) {
        continue;
    }
    $date = $matches[1];
    foreach($dataResults as $dataRow) {
        $stats[$dataRow['name']][] = [intval(implode('', explode('-', $date))), floatval($dataRow['coverage'])];
    }
}
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="600" />
    <title>Php Tests Metrics</title>
    <meta name="description" content="Dashboard of Php tests metrics">
    <link rel="stylesheet" href="css/styles.css?v=1.0">
</head>
<body>
<div id="content">
<?php
    $dataResults = json_decode(file_get_contents('results.json'), true);
    foreach($dataResults as $idx => $results) {
        ?>
        <div class="project">
            <div class="status-<?php echo $results['status']; ?>"></div>
            <div class="name"><?php echo $results['name']; ?></div>
            <canvas class="canvas" value="<?php echo $results['coverage'] ? :0; ?>" id="chart-<?php echo $idx; ?>" width="100" height="100"></canvas>
            <div id="chart-<?php echo strtolower($results['name']); ?>" class="chart" data-chart='<?php echo json_encode($stats[$results['name']]); ?>'></div>
        </div>
<?php
    }
?>
</div>
<footer>
    dernière MAJ : <?php echo date('d/m/Y H:i:s', filemtime('results.json')); ?>
</footer>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>

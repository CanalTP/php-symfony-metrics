#!/bin/bash

RESULTS_FILE=results.json
RESULTS_TEMP_FILE=results_temp.json

echo "[" > $RESULTS_TEMP_FILE
NB_PROJECTS=$(grep -c name projects.json)
IDX_PROJECT_MAX=`echo "$NB_PROJECTS - 1" | bc -l`
ORGA=`cat projects.json | jq .organization | sed 's/"//g'`
echo "found $NB_PROJECTS projects"
for IDX in $(seq 0 $IDX_PROJECT_MAX); do
    PROJECT=`cat projects.json | jq .projects[$IDX].name | sed 's/"//g'`
    EXEC=`cat projects.json | jq .projects[$IDX].exec | sed 's/"//g'`
    echo "computing $PROJECT..."
    echo "executing $EXEC..."
    git clone git@github.com:$ORGA/$PROJECT.git
    pushd $PROJECT
    $COMPOSER_PATH install -n -q
    $EXEC --coverage-text=results.txt
    [[ $? = 0 ]] && STATUS="stable" || STATUS="unstable"
    COVERAGE=`cat results.txt | grep Lines -m 1 | grep -Po '\d+\.\d+%' | cut -d% -f1`
    echo "found status $STATUS with $COVERAGE%"
    popd
    [[ $IDX = 0 ]] || echo -n "," >> $RESULTS_TEMP_FILE
    cat >> $RESULTS_TEMP_FILE << EOF
{
    "name": "$PROJECT",
    "status": "$STATUS",
    "coverage": "$COVERAGE"
}
EOF
    rm -rf $PROJECT
done
echo "]" >> $RESULTS_TEMP_FILE
cat $RESULTS_TEMP_FILE | jq '.'
[[ $? = 0 ]] && mv $RESULTS_TEMP_FILE $RESULTS_FILE || (echo "malformatted json file" && exit 1)
cp $RESULTS_FILE data/logs-$(date +%Y-%m-%d).json
exit 0

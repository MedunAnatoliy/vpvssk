/**
 * Project EasyPage
 * Библиотека берет данные с JSON файла
 * и переводит их в инструкции по замене данных на странице
 */

function EasyPage() {

    //
    // Local var's
    //

    var wordsFile = './data.json';
    var wordsMainGroup = 'default';
    var wordsJson = null;


    /**
     * Initialize main class
     * @param group
     */
    this.init = function(fileUrl, group) {
        console.info('[EasyPage] Init module');
        if (group != null && group != undefined)
            wordsMainGroup = group;
        if (fileUrl != null && fileUrl != undefined)
            wordsFile = fileUrl;
        // Loading json file and words
        loadingWords();
    };


    //
    // Main functions
    //


    /**
     * Return parameter value from url ($_GET)
     * @param name
     * @returns {*}
     */
    this.getParameterByName = function (name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };


    //
    // Functions for replacing and update site content
    //


    /**
     * Loading json words from data file
     */
    function loadingWords() {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: wordsFile,
            //cache: true,
            error: function () {
                console.error('[EasyPage] Error loading data file @data.json');
            }
        }).done(function (data) {
            //
            if (data != undefined) {
                wordsJson = data;
                startReplacing();
            }
        });
    }


    /**
     * Start foreach for replacing element in landing
     */
    function startReplacing() {
        if (wordsJson != null && wordsJson != undefined) {
            var words = wordsJson[wordsMainGroup];
            console.log(wordsMainGroup);

            for (var key in words) {
                if (words.hasOwnProperty(key)) {
                    // Start pasing
                    parsingData(words, key);
                }
            }

            console.info('[EasyPage] End. All data has been success replaced.');
        }
    }


    /**
     * Parsing json data and change html content
     * @param words
     * @param key
     */
    function parsingData(words, key) {
        // If key equals object
        if (typeof words[key] == "object") {
            var dataClass = key.toString();
            var dataGroup = words[key]['group'].toString();
            var dataType = words[key]['type'].toString();
            var dataValue = words[key]['value'].toString();
            // Replace attr src
            if (dataGroup == 'attr')
                $(dataClass).attr(dataType, dataValue);
        }

        // If key normal
        else {
            $(key).html(words[key].toString());
        }
    }

}

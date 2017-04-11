function Helpers() {

    /**
     * Отправка данных с формы
     * @param cls Указатель на форму
     * @param classError Класс для присвоения полю при ошибке заполнения
     * @param checkInputs Массив с индитификаторами инпут-полей
     */
    this.ajaxForm = function (cls, classError, checkInputs) {
        $(cls).submit(function () {
            var th = $(this);
            $.ajax({
                type: "POST",
                url: th.attr('action'),
                data: th.serialize()
            }).done(function (data) {
                var error = 0;

                if (checkInputs != undefined && checkInputs != null) {
                    if (typeof(checkInputs) == 'object') {
                        for (inx in checkInputs) {
                            var obj = checkInputs[inx];
                            th.find(obj).removeClass(classError);
                            if (th.find(obj).has() && th.find(obj).val() < 2) {
                                th.find(obj).addClass(classError);
                                error++;
                            }
                        }
                    }
                }

                if (error == 0) {
                    th.trigger("reset");
                    // Code..
                }
                else {
                    setTimeout(function () {
                        th.find('input').removeClass(classError);
                    }, 3000);
                }
            });
            return false;
        });
    };


    /**
     * Присваивает элементу с указанным
     * ID/Class содержимое подгруженной страницы
     * @param url Ссылка на получаемый контент
     * @param cls Указатель на элемент, в который присвоить
     */
    this.setContentFromUrl = function(url, cls) {
        $.ajax({
            type: "GET",
            url: url,
            error: function () {
                console.error('Error load content from ' + url);
            }
        }).done(function (data) {
            if (data != undefined && data != null) {
                $(cls).html(data);
            }
        });
    };


    /**
     * Процентная высота элемента.
     * Пригодится в "непроцентном дизайне".
     * @param cls
     */
    this.adaptiveHeight = function(cls) {
        $(cls).each(function () {
            var th = $(this);
            var width = th.width();
            var height = 0;
            if (th.attr('data-at') != null) {
                // Высота по родительскому элементу
                if (th.attr('data-at') == 'parent')
                    height = th.parent().height() / 100 * th.attr('data-ah');
                // Высота по размеру окна
                if (th.attr('data-at') == 'window')
                    height = $(window).height() / 100 * th.attr('data-ah');
            }
            // По стандарту (если нет data тегов)
            // берем длину элемента и считаем проценты от нее
            else
                height = width / 100 * th.attr('data-ah');

            th.css('min-height', height + 'px');
        });
    }
}
"use strict";

/**
 * 공통 스크립트
 */
(function (W) {

    /************************************ serializeJson 설정 추가 시작 ************************************/
    $.fn.serializeJson = function (pAddOjb) {
        if (pAddOjb === void 0) {
            pAddOjb = {};
        }

        var oResult = null;

        try {
            var arr = this.find("input:text, input:radio, input:checkbox, input:hidden, input:password, select, textarea");

            if (arr) {
                oResult = {};
                var vArrName = '';
                var arrData = [];
                var jsonArr = {};
                var $this = null;
                $.each(arr, function () {
                    $this = $(this);

                    if (this.name !== '' && (!$this.prop('disabled') || $this.attr('ignoreDisable') == "Y")) {
                        if ($this.attr('jsonArray')) {
                            if (vArrName !== $this.attr('jsonArray')) {
                                if (Object.keys(jsonArr).length !== 0) {
                                    arrData.push(jsonArr);
                                    oResult[vArrName] = arrData;
                                    jsonArr = {};
                                    arrData = [];
                                } else {
                                    if (this.type === 'checkbox') {
                                        if (this.checked === true) {
                                            jsonArr[this.name] = $this.val();
                                        } else {
                                            if ($this.is('[unchkValue]')) {
                                                jsonArr[this.name] = $this.attr('unchkValue');
                                            }
                                        }
                                    } else if (this.type == 'radio') {
                                        if (this.checked == true) {
                                            jsonArr[this.name] = $this.val();
                                        }
                                    } else {
                                        jsonArr[this.name] = $this.val();
                                    }
                                }

                                vArrName = $this.attr('jsonArray');
                            } else {
                                if (jsonArr.hasOwnProperty(this.name)) {
                                    arrData.push(jsonArr);
                                    jsonArr = {};
                                }

                                if (this.type == 'checkbox') {
                                    if (this.checked == true) {
                                        jsonArr[this.name] = $this.val();
                                    } else {
                                        if ($this.is('[unchkValue]')) {
                                            jsonArr[this.name] = $this.attr('unchkValue');
                                        }
                                    }
                                } else if (this.type == 'radio') {
                                    if (this.checked == true) {
                                        jsonArr[this.name] = $this.val();
                                    }
                                } else {
                                    jsonArr[this.name] = $this.val();
                                }
                            }
                        } else {
                            if (vArrName != '' && Object.keys(jsonArr).length != 0) {
                                arrData.push(jsonArr);
                                oResult[vArrName] = arrData;
                                jsonArr = {};
                                arrData = [];
                                vArrName = '';
                            }

                            if (this.type == 'checkbox') {
                                if (this.checked == true) {
                                    oResult[this.name] = $this.val();
                                } else {
                                    if ($this.is('[unchkValue]')) {
                                        oResult[this.name] = $this.attr('unchkValue');
                                    }
                                }
                            } else if (this.type == 'radio') {
                                if (this.checked == true) {
                                    oResult[this.name] = $this.val();
                                }
                            } else if (Array.isArray($this.val())) {
                                //oResult[this.name] = JSON.stringify($this.val());
                                oResult[this.name] = $this.val();
                            } else {
                                oResult[this.name] = $this.val();
                            }
                        }
                    }
                });

                if (vArrName !== '' && Object.keys(jsonArr).length !== 0) {
                    arrData.push(jsonArr);
                    oResult[vArrName] = arrData;
                    jsonArr = {};
                    arrData = [];
                    vArrName = '';
                }
            }
        } catch (e) {
            console.log("error: ", e);
        } //console.log("JSON.stringify(oResult) : ", JSON.stringify(oResult) );


        oResult = $.extend(oResult, pAddOjb);
        return oResult;
    };
    /************************************ serializeJson 설정 추가 끝 ************************************/

})(window);
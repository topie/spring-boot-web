/**
 * Created by chenguojun on 8/10/16.
 */
;
(function ($, window, document, undefined) {
    var uploadMapping = {
        "/api/score/materialReceive/receiving": "scoreMaterialReceiveReceiving",
        "/api/score/materialReceive/received": "scoreMaterialReceiveReceived",
        "/api/score/materialReceive/refused": "scoreMaterialReceiveRefused"
    };
    App.requestMapping = $.extend({}, window.App.requestMapping, uploadMapping);
    App.scoreMaterialReceiveReceiving = {
        page: function (title) {
            window.App.content.empty();
            window.App.title(title);
            var content = $('<div class="panel-body" >' +
                '<div class="row">' +
                '<div class="col-md-12" >' +
                '<div class="widget-box">' +
                '<div class="widget-header widget-header-flat">' +
                '<h4 class="widget-title smaller">待接收</h4>' +
                '<div class="widget-toolbar">' +
                '<div class="pull-right">' +
                '<div class="btn-toolbar inline middle no-margin">' +
                '<div class="btn-group no-margin">' +
                '<button id="id-button" class="btn btn-sm btn-success active">' +
                '<span class="bigger-110">按申请人查看</span>' +
                '</button>' +
                '<button id="in-button" class="btn btn-sm btn-success">' +
                '<span class="bigger-110">按指标查看</span>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="widget-body">' +
                '<div class="widget-main" id="grid">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            window.App.content.append(content);
            scoreMaterialReceiveIdentityInfo("receiving");
            content.find("#in-button").on("click", function () {
                $("#id-button").removeClass("active");
                $("#in-button").addClass("active");
                content.find("#grid").empty();
                scoreMaterialReceive("receiving");
            });
            content.find("#id-button").on("click", function () {
                $("#in-button").removeClass("active");
                $("#id-button").addClass("active");
                content.find("#grid").empty();
                scoreMaterialReceiveIdentityInfo("receiving");
            });
        }
    };
    App.scoreMaterialReceiveReceived = {
        page: function (title) {
            window.App.content.empty();
            window.App.title(title);
            var content = $('<div class="panel-body" >' +
                '<div class="row">' +
                '<div class="col-md-12" >' +
                '<div class="widget-box">' +
                '<div class="widget-header widget-header-flat">' +
                '<h4 class="widget-title smaller">已接收</h4>' +
                '<div class="widget-toolbar">' +
                '<div class="pull-right">' +
                '<div class="btn-toolbar inline middle no-margin">' +
                '<div class="btn-group no-margin">' +
                '<button id="id-button" class="btn btn-sm btn-success active">' +
                '<span class="bigger-110">按申请人查看</span>' +
                '</button>' +
                '<button id="in-button" class="btn btn-sm btn-success">' +
                '<span class="bigger-110">按指标查看</span>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="widget-body">' +
                '<div class="widget-main" id="grid">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            window.App.content.append(content);
            scoreMaterialReceiveIdentityInfo("received");
            content.find("#in-button").on("click", function () {
                $("#id-button").removeClass("active");
                $("#in-button").addClass("active");
                content.find("#grid").empty();
                scoreMaterialReceive("received");
            });
            content.find("#id-button").on("click", function () {
                $("#in-button").removeClass("active");
                $("#id-button").addClass("active");
                content.find("#grid").empty();
                scoreMaterialReceiveIdentityInfo("received");
            });
        }
    };

    App.scoreMaterialReceiveRefused = {
        page: function (title) {
            window.App.content.empty();
            window.App.title(title);
            var content = $('<div class="panel-body" >' +
                '<div class="row">' +
                '<div class="col-md-12" >' +
                '<div class="widget-box">' +
                '<div class="widget-header widget-header-flat">' +
                '<h4 class="widget-title smaller">已接收</h4>' +
                '<div class="widget-toolbar">' +
                '<div class="pull-right">' +
                '<div class="btn-toolbar inline middle no-margin">' +
                '<div class="btn-group no-margin">' +
                '<button id="id-button" class="btn btn-sm btn-success active">' +
                '<span class="bigger-110">按申请人查看</span>' +
                '</button>' +
                '<button id="in-button" class="btn btn-sm btn-success">' +
                '<span class="bigger-110">按指标查看</span>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="widget-body">' +
                '<div class="widget-main" id="grid">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            window.App.content.append(content);
            scoreMaterialReceiveIdentityInfo("refused");
            content.find("#in-button").on("click", function () {
                $("#id-button").removeClass("active");
                $("#in-button").addClass("active");
                content.find("#grid").empty();
               // scoreMaterialReceive("received");
            });
            content.find("#id-button").on("click", function () {
                $("#in-button").removeClass("active");
                $("#id-button").addClass("active");
                content.find("#grid").empty();
                scoreMaterialReceiveIdentityInfo("refused");
            });
        }
    };

    var scoreMaterialReceive = function (mode) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: App.href + "/api/score/scoreRecord/formItems",
            success: function (fd) {
                if (fd.code === 200) {
                    var formItems = fd.data.formItems;
                    var searchItems = fd.data.searchItems;
                    var scoreRecordStatus = fd.data.scoreRecordStatus;
                    var edit = fd.data.edit;
                    if (searchItems == null)
                        searchItems = [];
                    searchItems.push(
                        {
                            type: "select",
                            label: "企业",
                            name: "companyId",
                            items: [
                                {
                                    text: '全部',
                                    value: ''
                                }
                            ],
                            itemsUrl: App.href + '/api/score/companyInfo/options'
                        }
                    );
                    var columns = [];
                    $.each(formItems, function (ii, dd) {
                        if (dd.type === 'text' || dd.name === 'id') {
                            var column = {};
                            if (dd.name == 'personName') {
                                column = {
                                    title: dd.label,
                                    field: dd.name,
                                    dataClick: function (i, d) {
                                        var requestUrl = App.href + "/api/score/info/identityInfo/detail";
                                        $.ajax({
                                            type: "GET",
                                            dataType: "json",
                                            url: requestUrl,
                                            data: {
                                                id: d.personId
                                            },
                                            success: function (data) {
                                                var hostName = window.location.host;
                                                var img = {};
                                                if (hostName == "172.16.200.68") {
                                                    img = $('<img width="400" height="300" src="' + data.data.idCardPositive.replace("218.67.246.52:80", "172.16.200.68:8092") + '"><br><img  width="400" height="300"  src="' + data.data.idCardOpposite.replace("218.67.246.52:80", "172.16.200.68:8092") + '">');
                                                } else {
                                                    img = $('<img width="400" height="300" src="' + data.data.idCardPositive + '"><br><img  width="400" height="300"  src="' + data.data.idCardOpposite + '">');
                                                }
                                                $.orangeModal({
                                                    title: "图片预览",
                                                    destroy: true,
                                                    buttons: [
                                                        {
                                                            text: '打印',
                                                            cls: 'btn btn-primary',
                                                            handle: function (m) {
                                                                m.$body.print({
                                                                    globalStyles: true,
                                                                    mediaPrint: false,
                                                                    stylesheet: null,
                                                                    noPrintSelector: ".no-print",
                                                                    iframe: true,
                                                                    append: null,
                                                                    prepend: null,
                                                                    manuallyCopyFormValues: true,
                                                                    deferred: $.Deferred()
                                                                });
                                                            }
                                                        }, {
                                                            type: 'button',
                                                            text: '关闭',
                                                            cls: "btn btn-default",
                                                            handle: function (m) {
                                                                m.hide()
                                                            }
                                                        }
                                                    ]
                                                }).show().$body.html(img);
                                            },
                                            error: function (e) {
                                                console.error("请求异常。");
                                            }
                                        });
                                    }
                                };
                            } else {
                                column = {
                                    title: dd.label,
                                    field: dd.name
                                };
                            }
                            columns.push(column);
                        }
                        if (dd.itemsUrl !== undefined) {
                            dd.itemsUrl = App.href + dd.itemsUrl;
                        }
                        if (dd.url !== undefined) {
                            dd.url = App.href + dd.url;
                        }
                    });
                    columns.push({
                        title: '接收部门',
                        field: 'opRole'
                    });
                    columns.push({
                        title: '办理人',
                        field: 'opUser'
                    });
                    columns.push({
                        title: '办理进度',
                        field: 'status',
                        format: function (i, d) {
                            return scoreRecordStatus[d.status];
                        }
                    });
                    columns.push({
                        title: '受理日期',
                        field: 'acceptDate',
                        sort: true
                    });
                    var grid;
                    var options = {
                        url: App.href + "/api/score/materialReceive/" + mode,
                        contentType: "table",
                        contentTypeItems: "table,card,list",
                        pageNum: 1,//当前页码
                        pageSize: 15,//每页显示条数
                        idField: "id",//id域指定
                        headField: "id",
                        showCheck: true,//是否显示checkbox
                        checkboxWidth: "3%",
                        showIndexNum: false,
                        indexNumWidth: "5%",
                        pageSelect: [2, 15, 30, 50],
                        columns: columns,
                        select2: true,
                        actionColumnText: "操作",//操作列文本
                        actionColumnWidth: "20%",
                        actionColumns: [
                            {
                                text: "查看",
                                cls: "btn-danger btn-sm",
                                handle: function (index, d) {
                                    var modal = $.orangeModal({
                                        id: "view_receive_form_modal",
                                        title: "查看",
                                        destroy: true
                                    }).show();
                                    var requestUrl = App.href + "/api/score/materialReceive/detailAll";
                                    $.ajax({
                                        type: "GET",
                                        dataType: "json",
                                        url: requestUrl,
                                        data: {
                                            "identityInfoId": d.personId,
                                            "indicatorId": d.indicatorId,
                                            "opRoleId": d.opRoleId
                                        },
                                        success: function (data) {
                                            modal.$body.html(data.data.html);
                                            var clist = data.data.mCheckList;
                                            for (var i in clist) {
                                                modal.$body.find("input[name=material]:checkbox[value='" + clist[i] + "']").attr('checked', 'true');
                                            }
                                        },
                                        error: function (e) {
                                            console.error("请求异常。");
                                        }
                                    });
                                }
                            }, {
                                text: "接收",
                                cls: "btn-primary btn-sm",
                                visible: function (i, d) {
                                    return d.status === 2;
                                },
                                handle: function (index, d) {
                                    var modal = $.orangeModal({
                                        id: "receive_form_modal",
                                        title: "接收",
                                        destroy: true,
                                        buttons: [
                                            {
                                                text: '确认送达',
                                                cls: 'btn btn-info',
                                                handle: function (m) {
                                                    bootbox.confirm("确定该操作?", function (result) {
                                                        if (result) {
                                                            var mIds = [];
                                                            m.$body.find('input[name="material"]:checked').each(function () {
                                                                mIds.push($(this).val());
                                                            });
                                                            var requestUrl = App.href + "/api/score/materialReceive/confirmReceived";
                                                            if (mIds.length == 0) {
                                                                bootbox.confirm("未勾选材料，是否确认操作?", function (result) {
                                                                    if (result) {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            dataType: "json",
                                                                            url: requestUrl,
                                                                            data: {
                                                                                indicatorId: d.indicatorId,
                                                                                personId: d.personId,
                                                                                mIds: mIds.toString(),
                                                                                opRoleId: d.opRoleId
                                                                            },
                                                                            success: function (data) {
                                                                                grid.reload();
                                                                                m.hide();
                                                                            },
                                                                            error: function (e) {
                                                                                console.error("请求异常。");
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            } else {
                                                                $.ajax({
                                                                    type: "POST",
                                                                    dataType: "json",
                                                                    url: requestUrl,
                                                                    data: {
                                                                        personId: d.personId,
                                                                        mIds: mIds.toString(),
                                                                        opRoleId: d.opRoleId
                                                                    },
                                                                    success: function (data) {
                                                                        grid.reload();
                                                                        m.hide();
                                                                    },
                                                                    error: function (e) {
                                                                        console.error("请求异常。");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }, {
                                                text: '不通过',
                                                cls: 'btn btn-info',
                                                handle: function (m) {
                                                    bootbox.confirm("确定该操作?", function (result) {
                                                        if (result) {

                                                        }
                                                    });
                                                }
                                            }
                                        ]
                                    }).show();
                                    var requestUrl = App.href + "/api/score/materialReceive/detailAll";
                                    $.ajax({
                                        type: "GET",
                                        dataType: "json",
                                        url: requestUrl,
                                        data: {
                                            "identityInfoId": d.personId,
                                            "indicatorId": d.indicatorId,
                                            "opRoleId": d.opRoleId
                                        },
                                        success: function (data) {
                                            modal.$body.html(data.data.html);
                                            var clist = data.data.mCheckList;
                                            for (var i in clist) {
                                                modal.$body.find("input[name=material]:checkbox[value='" + clist[i] + "']").attr('checked', 'true');
                                            }
                                        },
                                        error: function (e) {
                                            console.error("请求异常。");
                                        }
                                    });
                                }
                            }
                        ],
                        search: {
                            rowEleNum: 2,
                            //搜索栏元素
                            items: searchItems
                        }
                    };
                    grid = window.App.content.find("#grid").orangeGrid(options);
                } else {
                    alert(fd.message);
                }
            },
            error: function (e) {
                console.error("请求异常。");
            }
        });
    };

    var scoreMaterialReceiveIdentityInfo = function (mode) {
        //是否显示家庭关系（卫健委）按钮
        var isVisibleRelationship = false;
        var authoritiesArray = window.App.currentUser['authorities'];
        if (authoritiesArray != undefined) {
            outLoop:
                for (var index in authoritiesArray) {
                    if (authoritiesArray.hasOwnProperty(index)) {
                        switch (authoritiesArray[index]['authority']) {
                            //人社
                            case '3':
                            //卫健委
                            case '12':
                                isVisibleRelationship = true;
                                break outLoop;
                        }
                    }
                }
        }

        var searchItems = [
            {
                type: 'text',
                label: '申请人身份证',
                name: 'personIdNum'
            }, {
                type: 'text',
                label: '申请人姓名',
                name: 'personName'
            }, {
                type: 'select',
                label: '受理日期查询设置',
                name: 'dateSearch',
                items: [
                    {
                        text: '关闭',
                        value: 0
                    }, {
                        text: '开启',
                        value: 1
                    }
                ]
            }, {
                type: 'datepicker',
                label: '受理日期',
                name: 'acceptDate',
                single: true
            }, {
                type: 'select',
                label: '房子合同/产权证（区分住建委、规自局）',
                name: 'rightProperty',
                items: [
                    {
                        text: '请选择',
                        value: 0
                    }, {
                        text: '无租赁+持有“不动产权证”',
                        value: 1
                    }, {
                        text: '租赁租房+自有住房（合同）+自有住房（产权证）',
                        value: 2
                    }
                ]
            }
            , {
                type: 'select',
                label: '受教育程度',
                name: 'cultureDegree',
                items: [
                    {
                        text: '请选择',
                        value: 0
                    }, {
                        text: '本科及以上学历',
                        value: 4
                    }, {
                        text: '大专学历',
                        value: 5
                    }
                    , {
                        text: '高级技工学校高级班',
                        value: 1011
                    }
                    , {
                        text: '无',
                        value: 1013
                    }
                ]
            }
            , {
                type: 'select',
                label: '配偶就业或现役军人',
                name: 'inTianjin',
                items: [
                    {
                        text: '请选择',
                        value: 0
                    }, {
                        text: '是',
                        value: 1
                    }, {
                        text: '否',
                        value: 2
                    }
                ]
            }, {
                type: 'select',
                label: '服役期间立功情况',
                name: 'soldierMeritorious',
                items: [
                    {
                        text: '请选择',
                        value: 0
                    }, {
                        text: '荣立个人一等功',
                        value: 47
                    }, {
                        text: '荣立个人二等功',
                        value: 48
                    }, {
                        text: '荣立个人三等功',
                        value: 49
                    }, {
                        text: '无',
                        value: 50
                    }
                ]
            }, {
                type: 'select',
                label: '是否缴存住房公积金',
                name: 'providentFund',
                items: [
                    {
                        text: '请选择',
                        value: 0
                    }, {
                        text: '是',
                        value: 1
                    }, {
                        text: '否',
                        value: 2
                    }
                ]
            }
        ];
        // searchItems.push(
        //     {
        //         type: "select",
        //         label: "企业",
        //         name: "companyId",
        //         items: [
        //             {
        //                 text: '全部',
        //                 value: ''
        //             }
        //         ],
        //         itemsUrl: App.href + '/api/score/companyInfo/options'
        //     }
        // );
        var columns = [
            {
                title: '申请人ID',
                field: 'personId'
            }, {
                title: '申请人姓名',
                field: 'personName',
                dataClick: function (i, d) {
                    var requestUrl = App.href + "/api/score/info/identityInfo/detail";
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: requestUrl,
                        data: {
                            id: d.personId
                        },
                        success: function (data) {
                            var hostName = window.location.host;
                            var img = {};
                            if (hostName == "172.16.200.68") {
                                img = $('<img width="400" height="300" src="' + data.data.idCardPositive.replace("218.67.246.52:80", "172.16.200.68:8092") + '"><br><img  width="400" height="300"  src="' + data.data.idCardOpposite.replace("218.67.246.52:80", "172.16.200.68:8092") + '">');
                            } else {
                                img = $('<img width="400" height="300" src="' + data.data.idCardPositive + '"><br><img  width="400" height="300"  src="' + data.data.idCardOpposite + '">');
                            }
                            var modal = $.orangeModal({
                                title: "图片预览",
                                destroy: true,
                                buttons: [
                                    {
                                        text: '打印',
                                        cls: 'btn btn-primary',
                                        handle: function (m) {
                                            m.$body.print({
                                                globalStyles: true,
                                                mediaPrint: false,
                                                stylesheet: null,
                                                noPrintSelector: ".no-print",
                                                iframe: true,
                                                append: null,
                                                prepend: null,
                                                manuallyCopyFormValues: true,
                                                deferred: $.Deferred()
                                            });
                                        }
                                    }, {
                                        type: 'button',
                                        text: '关闭',
                                        cls: "btn btn-default",
                                        handle: function (m) {
                                            m.hide()
                                        }
                                    }
                                ]
                            });
                            modal.$body.html(img);
                            modal.show();
                        },
                        error: function (e) {
                            console.error("请求异常。");
                        }
                    });
                }
            },
            {
                title: '申请人身份证',
                field: 'personIdNum'
            },
            {
                title: '企业',
                field: 'companyName'
            },
            {
                title: '受理日期',
                field: 'acceptDate',
                sort: true
            },
            {
                title: '补正日期',
                field: 'supplyDateStr',
                sort: true
            },
            {
                title: '公安落户编号',
                field: 'acceptNumber'
            }
        ];
        var grid;
        var options = {
            url: App.href + "/api/score/materialReceive/identityInfo/" + mode,
            contentType: "table",
            contentTypeItems: "table,card,list",
            pageNum: 1,//当前页码
            pageSize: 15,//每页显示条数
            idField: "id",//id域指定
            headField: "id",
            showCheck: true,//是否显示checkbox
            checkboxWidth: "3%",
            showIndexNum: false,
            indexNumWidth: "5%",
            pageSelect: [2, 15, 30, 50],
            columns: columns,
            select2: true,
            actionColumnText: "操作",//操作列文本
            actionColumnWidth: "20%",
            actionColumns: [
                {
                    text: "查看",
                    cls: "btn-success btn-sm",
                    visible: function (i, d) {
                        return mode === "received"
                    },
                    handle: function (index, d) {
                        var modal = $.orangeModal({
                            id: "view_receive_form_modal",
                            title: "查看",
                            destroy: true
                        }).show();
                        var requestUrl = App.href + "/api/score/materialReceive/identityInfo/detailAll?identityInfoId=" + d.personId;
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: requestUrl,
                            success: function (data) {
                                modal.$body.html(data.data.html);
                                var clist = data.data.mCheckList;
                                for (var i in clist) {
                                    modal.$body.find("input[name=material]:checkbox[value='" + clist[i] + "']").attr('checked', 'true');
                                }
                            },
                            error: function (e) {
                                console.error("请求异常。");
                            }
                        });
                    }
                }, {
                    text: '修改',
                    cls: 'btn-danger btn-sm',
                    visible: function (i, d) {
                        return d.edit === 1;
                    },
                    handle: function (i, d) {
                        var modal = $.orangeModal({
                            id: "approve_edit_form_modal",
                            title: "修改申请人信息",
                            width: "70%",
                            height: "460px",
                            destroy: true,
                            buttons: [
                                {
                                    text: '保存',
                                    cls: 'btn btn-warning',
                                    handle: function (mm) {
                                        bootbox.confirm("确定修改吗?", function (result) {
                                            if (result) {
                                                var arr = [];
                                                mm.$body.find(".edit").each(function () {
                                                    var that = $(this);
                                                    arr.push({
                                                        'name': that.attr("data-name"),
                                                        'id': that.attr("data-id"),
                                                        'value': that.val()
                                                    });
                                                });
                                                var requestUrl = App.href + "/api/score/info/identityInfo/updateEdit";
                                                $.ajax({
                                                    type: "POST",
                                                    dataType: "json",
                                                    url: requestUrl,
                                                    data: {
                                                        identityInfoId: d.personId,
                                                        editInfo: JSON.stringify(arr)
                                                    },
                                                    success: function (data) {
                                                        var requestUrl1 = App.href + "/api/score/info/identityInfo/detailAll?identityInfoId=" + d.personId + "&template=identity_info_for_edit";
                                                        $.ajax({
                                                            type: "GET",
                                                            dataType: "json",
                                                            url: requestUrl1,
                                                            success: function (data) {
                                                                modal.$body.html(data.data.html);
                                                            },
                                                            error: function (e) {
                                                                console.error("请求异常。");
                                                            }
                                                        });
                                                        mm.hide();
                                                    },
                                                    error: function (e) {
                                                        console.error("请求异常。");
                                                    }
                                                });
                                            }
                                        });

                                    }
                                },
                                {
                                    text: '关闭',
                                    cls: 'btn btn-default',
                                    handle: function (mm) {
                                        mm.hide();
                                    }
                                }
                            ]
                        }).show();
                        var requestUrl = App.href + "/api/score/info/identityInfo/detailAll?identityInfoId=" + d.personId + "&template=identity_info_for_edit1";
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: requestUrl,
                            success: function (data) {
                                modal.$body.html(data.data.html);
                            },
                            error: function (e) {
                                console.error("请求异常。");
                            }
                        });
                    }
                }, {
                    text: "打印接收凭证",
                    cls: "btn-info btn-sm",
                    visible: function (i, d) {
                        return mode === "received"
                    },
                    handle: function (index, d) {
                        var requestUrl = App.href + "/api/score/print/acceptMaterialDoc?personId=" + d.personId;
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: requestUrl,
                            success: function (data) {
                                $.orangeModal({
                                    title: "打印接收凭证",
                                    destroy: true,
                                    buttons: [
                                        {
                                            type: 'button',
                                            text: '关闭',
                                            cls: "btn btn-default",
                                            handle: function (m) {
                                                m.hide()
                                            }
                                        }, {
                                            text: '打印',
                                            cls: 'btn btn-primary',
                                            handle: function (m) {
                                                m.$body.print({
                                                    globalStyles: true,
                                                    mediaPrint: false,
                                                    stylesheet: null,
                                                    noPrintSelector: ".no-print",
                                                    iframe: true,
                                                    append: null,
                                                    prepend: null,
                                                    manuallyCopyFormValues: true,
                                                    deferred: $.Deferred()
                                                });
                                            }
                                        }, {
                                            text: '导出',
                                            cls: 'btn btn-primary',
                                            handle: function (m) {
                                                window.open(App.href + "/api/score/export/acceptMaterialDoc?personId=" + d.personId)
                                            }
                                        }
                                    ],
                                    onEnter: function (m) {
                                        m.$body.print({
                                            globalStyles: true,
                                            mediaPrint: false,
                                            stylesheet: null,
                                            noPrintSelector: ".no-print",
                                            iframe: true,
                                            append: null,
                                            prepend: null,
                                            manuallyCopyFormValues: true,
                                            deferred: $.Deferred()
                                        });
                                    }
                                }).show().$body.html(data.data.html);
                            },
                            error: function (e) {
                                console.error("请求异常。");
                            }
                        });
                    }
                }, {
                    text: "接收",
                    visible: function (i, d) {
                        return (mode === "receiving" || mode === "refused");
                    },
                    cls: "btn-primary btn-sm",
                    handle: function (index, d) {
                        var modal = $.orangeModal({
                            id: "receive_form_modal",
                            title: "接收",
                            destroy: true,
                            buttons: [
                                {
                                    text: '确认送达',
                                    cls: 'btn btn-success',
                                    handle: function (m) {
                                        bootbox.confirm("确定该操作?", function (result) {
                                            if (result) {
                                                var mIds = [];
                                                m.$body.find('input[name="material"]:checked').each(function () {
                                                    mIds.push($(this).val());
                                                });
                                                var requestUrl = App.href + "/api/score/materialReceive/identityInfo/confirmReceived";
                                                if (mIds.length == 0) {
                                                    bootbox.confirm("未勾选材料，是否确认操作?", function (result) {
                                                        if (result) {
                                                            $.ajax({
                                                                type: "POST",
                                                                dataType: "json",
                                                                url: requestUrl,
                                                                data: {
                                                                    personId: d.personId,
                                                                    mIds: mIds.toString()
                                                                },
                                                                success: function (data) {
                                                                    grid.reload();
                                                                    m.hide();
                                                                    var requestUrl = App.href + "/api/score/print/acceptMaterialDoc?personId=" + d.personId;
                                                                    $.ajax({
                                                                        type: "GET",
                                                                        dataType: "json",
                                                                        url: requestUrl,
                                                                        success: function (data) {
                                                                            if(data.data.code==666){
                                                                                $.orangeModal({
                                                                                    title: "打印接收凭证",
                                                                                    destroy: true,
                                                                                    buttons: [
                                                                                        {
                                                                                            type: 'button',
                                                                                            text: '关闭',
                                                                                            cls: "btn btn-default",
                                                                                            handle: function (m) {
                                                                                                m.hide()
                                                                                            }
                                                                                        }, {
                                                                                            text: '打印',
                                                                                            cls: 'btn btn-primary',
                                                                                            handle: function (m) {
                                                                                                m.$body.print({
                                                                                                    globalStyles: true,
                                                                                                    mediaPrint: false,
                                                                                                    stylesheet: null,
                                                                                                    noPrintSelector: ".no-print",
                                                                                                    iframe: true,
                                                                                                    append: null,
                                                                                                    prepend: null,
                                                                                                    manuallyCopyFormValues: true,
                                                                                                    deferred: $.Deferred()
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }).show().$body.html(data.data.html);
                                                                            }

                                                                        },
                                                                        error: function (e) {
                                                                            console.error("请求异常。");
                                                                        }
                                                                    });

                                                                },
                                                                error: function (e) {
                                                                    console.error("请求异常。");
                                                                }
                                                            });
                                                        }
                                                    });
                                                } else {
                                                    $.ajax({
                                                        type: "POST",
                                                        dataType: "json",
                                                        url: requestUrl,
                                                        data: {
                                                            personId: d.personId,
                                                            mIds: mIds.toString()
                                                        },
                                                        success: function (data) {
                                                            grid.reload();
                                                            m.hide();
                                                            var requestUrl = App.href + "/api/score/print/acceptMaterialDoc?personId=" + d.personId;
                                                            $.ajax({
                                                                type: "GET",
                                                                dataType: "json",
                                                                url: requestUrl,
                                                                success: function (data) {
                                                                    if(data.data.code==666){
                                                                        $.orangeModal({
                                                                            title: "打印接收凭证",
                                                                            destroy: true,
                                                                            buttons: [
                                                                                {
                                                                                    type: 'button',
                                                                                    text: '关闭',
                                                                                    cls: "btn btn-default",
                                                                                    handle: function (m) {
                                                                                        m.hide()
                                                                                    }
                                                                                }, {
                                                                                    text: '打印',
                                                                                    cls: 'btn btn-primary',
                                                                                    handle: function (m) {
                                                                                        m.$body.print({
                                                                                            globalStyles: true,
                                                                                            mediaPrint: false,
                                                                                            stylesheet: null,
                                                                                            noPrintSelector: ".no-print",
                                                                                            iframe: true,
                                                                                            append: null,
                                                                                            prepend: null,
                                                                                            manuallyCopyFormValues: true,
                                                                                            deferred: $.Deferred()
                                                                                        });
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }).show().$body.html(data.data.html);
                                                                    }

                                                                },
                                                                error: function (e) {
                                                                    console.error("请求异常。");
                                                                }
                                                            });

                                                        },
                                                        error: function (e) {
                                                            console.error("请求异常。");
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }, {
                                    text: '材料待补正',
                                    cls: 'btn btn-danger',
                                    handle: function (mm) {
                                        var modal = $.orangeModal({
                                            id: "approve_supply_form_modal",
                                            title: "材料待补正",
                                            destroy: true,
                                            buttons: [
                                                {
                                                    text: '确认',
                                                    cls: 'btn btn-warning',
                                                    handle: function (m) {
                                                        bootbox.confirm("确定该操作?", function (result) {
                                                            if (result) {
                                                                var supplyArr = [];
                                                                m.$body.find("input[name=supplyMaterial]").each(
                                                                    function (i, d) {
                                                                        if ($(this).is(":checked")) {
                                                                            var id = $(this).val();
                                                                            var reason = $(this).parent().parent().next("tr").find("input[name=supplyReason]").val();
                                                                            supplyArr.push({
                                                                                "id": id,
                                                                                "reason": reason
                                                                            });
                                                                        }
                                                                    }
                                                                );
                                                                if (supplyArr.length == 0) {
                                                                    bootbox.alert("请勾选待补正材料!");
                                                                } else {
                                                                    var supplyStr = JSON.stringify(supplyArr);
                                                                    var requestUrl = App.href + "/api/score/materialReceive/identityInfo/supply";
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        dataType: "json",
                                                                        url: requestUrl,
                                                                        data: {
                                                                            "id": d.personId,
                                                                            "supplyArr": supplyStr
                                                                        },
                                                                        success: function (data) {
                                                                            if (data.code !== 200) {
                                                                                bootbox.alert(data.message);
                                                                            }
                                                                            grid.reload();
                                                                            m.hide();
                                                                            mm.hide();
                                                                        },
                                                                        error: function (e) {
                                                                            console.error("请求异常。");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                    }
                                                },
                                                {
                                                    text: '关闭',
                                                    cls: 'btn btn-default',
                                                    handle: function (m) {
                                                        m.hide();
                                                    }
                                                }
                                            ]
                                        }).show();
                                        var requestUrl = App.href + "/api/score/info/identityInfo/materialSupply?identityInfoId=" + d.personId;
                                        $.ajax({
                                            type: "GET",
                                            dataType: "json",
                                            url: requestUrl,
                                            success: function (data) {
                                                modal.$body.html(data.data.html);
                                                var checkList = data.data.cMids;
                                                for (var i in checkList) {
                                                    modal.$body.find("input[name=material]:checkbox[value='" + checkList[i] + "']").attr('checked', 'true');
                                                }
                                            },
                                            error: function (e) {
                                                console.error("请求异常。");
                                            }
                                        });
                                    }
                                }/*, {
                                    text: '全部不通过',
                                    cls: 'btn btn-danger',
                                    handle: function (m) {
                                        bootbox.confirm("确定该操作?", function (result) {
                                            if (result) {
                                                var mIds = [];
                                                var requestUrl = App.href + "/api/score/materialReceive/identityInfo/confirmReceived";
                                                $.ajax({
                                                    type: "POST",
                                                    dataType: "json",
                                                    url: requestUrl,
                                                    data: {
                                                        personId: d.personId,
                                                        mIds: mIds.toString()
                                                    },
                                                    success: function (data) {
                                                        grid.reload();
                                                        m.hide();
                                                        var requestUrl = App.href + "/api/score/print/acceptMaterialDoc?personId=" + d.personId;
                                                        $.ajax({
                                                            type: "GET",
                                                            dataType: "json",
                                                            url: requestUrl,
                                                            success: function (data) {
                                                                m.hide();
                                                                grid.reload();
                                                            },
                                                            error: function (e) {
                                                                console.error("请求异常。");
                                                            }
                                                        });

                                                    },
                                                    error: function (e) {
                                                        console.error("请求异常。");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }*/
                            ]
                        }).show();
                        var requestUrl = App.href + "/api/score/materialReceive/identityInfo/detailAll?identityInfoId=" + d.personId;
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: requestUrl,
                            success: function (data) {
                                modal.$body.html(data.data.html);
                                var clist = data.data.mCheckList;
                                for (var i in clist) {
                                    modal.$body.find("input[name=material]:checkbox[value='" + clist[i] + "']").attr('checked', 'true');
                                }
                            },
                            error: function (e) {
                                console.error("请求异常。");
                            }
                        });
                    }
                }, {
                    text: "积分审核表(市卫健委)",
                    cls: "btn-info btn-sm",
                    visible: function (i, d) {
                        return isVisibleRelationship
                    },
                    handle: function (index, d) {
                        var requestUrl = App.href + "/api/score/print/approvewjwExcel?identityInfoId=" + d.personId;
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: requestUrl,
                            success: function (data) {
                                $.orangeModal({
                                    title: "积分审核表(市卫健委)",
                                    destroy: true,
                                    buttons: [
                                        {
                                            type: 'button',
                                            text: '关闭',
                                            cls: "btn btn-default",
                                            handle: function (m) {
                                                m.hide()
                                            }
                                        }, {
                                            text: '导出',
                                            cls: 'btn btn-primary',
                                            handle: function (m) {
                                                var requestUrl = App.href + "/api/score/materialReceive/identityInfo/getIdentityInfoExcelWJW?identityInfoId=" + d.personId;
                                                window.open(requestUrl);
                                            }
                                        }
                                    ],
                                    onEnter: function (m) {
                                        m.$body.print({
                                            globalStyles: true,
                                            mediaPrint: false,
                                            stylesheet: null,
                                            noPrintSelector: ".no-print",
                                            iframe: true,
                                            append: null,
                                            prepend: null,
                                            manuallyCopyFormValues: true,
                                            deferred: $.Deferred()
                                        });
                                    }
                                }).show().$body.html(data.data.html);
                            },
                            error: function (e) {
                                console.error("请求异常。");
                            }
                        });
                    }
                }
            ],
            search: {
                rowEleNum: 2,
                //搜索栏元素
                items: searchItems
            }
        };
        grid = window.App.content.find("#grid").orangeGrid(options);
    };

})(jQuery, window, document);

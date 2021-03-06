/**
 * Created by chenguojun on 8/10/16.
 */
;
(function ($, window, document, undefined) {
    var uploadMapping = {
        "/api/score/approve/rensheAccept/rensheBackFinish": "rensheBackFinish"
    };
    App.requestMapping = $.extend({}, window.App.requestMapping, uploadMapping);
    App.rensheBackFinish = {
        page: function (title) {
            window.App.content.empty();
            window.App.title(title);
            var content = $('<div class="panel-body" >' +
                '<div class="row">' +
                '<div class="col-md-12" >' +
                '<div class="panel panel-default" >' +
                '<div class="panel-heading">退回未审核申请列表</div>' +
                '<div class="panel-body" id="grid"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            window.App.content.append(content);
            scoreRenshePrevApprove("rensheBackFinish");
        }
    };


    var scoreRenshePrevApprove = function (type) {

        //是否显示家庭关系（卫健委）按钮
        var isVisibleRelationship = false;
        var userType = window.App.currentUser['userType'];
        // 2019年7月29日，将这个表格添加到审核中心——人社预审——待审核——操作列，滨海新区人社权限用户可见
        // 管理员也可见，0：市区；1：滨海；2：市区+滨海
        if(userType==1 || userType==2){
            isVisibleRelationship = true;
        }

        $.ajax({
            type: "GET",
            dataType: "json",
            url: App.href + "/api/score/approve/renshePrevApprove/formItems",
            success: function (fd) {
                if (fd.code === 200) {
                    var formItems = fd.data.formItems;
                    var searchItems = fd.data.searchItems;
                    var unionApproveStatus2 = fd.data.unionApproveStatus2;
                    var unionApproveStatus1 = fd.data.unionApproveStatus1;
                    var reservationStatus = fd.data.reservationStatus;
                    var companyNames = fd.data.companyNames;
                    var newSearchItems = [];
                    if (searchItems != null) {
                        $.each(searchItems, function (ii, dd) {
                            if (dd.name !== 'batchId') {
                                newSearchItems.push(dd);
                            }
                        });
                    }
                    searchItems = newSearchItems;

                    // searchItems.push({
                    //     type: "datepicker",
                    //     label: "申请审核日期",
                    //     name: "preApprove",
                    //     single: true
                    // });
                    var columns = [];
                    $.each(formItems, function (ii, dd) {
                        if (dd.type === 'text' || dd.name === 'id') {
                            var column = {
                                title: dd.label,
                                field: dd.name
                            };
                            columns.push(column);
                        }
                        if (dd.itemsUrl !== undefined) {
                            dd.itemsUrl = App.href + dd.itemsUrl;
                        }
                        if (dd.url !== undefined) {
                            dd.url = App.href + dd.url;
                        }
                        if (dd.name == 'nation') {
                            var national = [
                                "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
                                "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
                                "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
                                "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
                            ];
                            for (var n in national) {
                                dd.items.push({
                                    text: national[n],
                                    value: national[n]
                                })
                            }
                        }
                    });
                    columns.push({
                        title: '性别',
                        field: 'sex',
                        format: function (ii, dd) {
                            return dd.sex === 1 ? '男' : '女';
                        }
                    });
                    columns.push(
                        {
                            title: '公安审核状态',
                            field: 'unionApproveStatus1',
                            format: function (i, cd) {
                                return unionApproveStatus1[cd.unionApproveStatus1];
                            }
                        }
                    );
                    columns.push(
                        {
                            title: '企业',
                            field: 'companyId',
                            format: function (i, cd) {
                                if (cd.companyWarning == 1) {
                                    return '<span style="color: red">' + cd.isPreviewd + '</span>';
                                } else {
                                    return cd.isPreviewd;
                                }

                            }
                        }
                    );

                    // if (type == "approving" || type == "supply") {
                    //     columns.push({
                    //         title: '预审剩余时间',
                    //         field: 'epStatus'
                    //     });
                    // }
                    // columns.push(
                    //     {
                    //         title: '锁定人',
                    //         field: 'lockUser2'
                    //     }
                    // );
                    // columns.push(
                    //     {
                    //         title: '审核人',
                    //         field: 'opuser2'
                    //     }
                    // );
                    var grid;
                    var options = {
                        url: App.href + "/api/score/approve/rensheAccept/" + type,
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
                        select2: true,
                        columns: columns,
                        actionColumnText: "操作",//操作列文本
                        actionColumnWidth: "20%",
                        actionColumns: [
                            {
                                text: "查看",
                                cls: "btn-info btn-sm",
                                visible: function (i, d) {
                                    return true;
                                },
                                handle: function (index, d) {
                                    var modal = $.orangeModal({
                                        id: "approve_form_modal",
                                        title: "查看申请人信息",
                                        destroy: true,
                                        buttons: [
                                            {
                                                text: '打印申请人信息',
                                                cls: 'btn btn-warning',
                                                handle: function (m) {
                                                    m.$body.find("#info-tab").print({
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
                                    }).show();
                                    var requestUrl = App.href + "/api/score/info/identityInfo/detailAll?identityInfoId=" + d.id + "&template=identity_info_for_pre";
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
                            }, {
                                text: "退回至未审核",
                                cls: "btn-danger btn-sm",
                                visible: function (i, d) {
                                    return d.unionApproveStatus2 != 1 && d.unionApproveStatus2 != 4;
                                },
                                handle: function (index, d) {
                                    bootbox.confirm("确定该操作？", function (result) {
                                        if (result){
                                            var requestUrl = App.href + "/api/score/approve/rensheAccept/rensheBackFinish2?id=" + d.id;
                                            $.ajax({
                                                type: "POST",
                                                dataType: "json",
                                                url: requestUrl,
                                                success: function (data) {
                                                    grid.reload();
                                                },
                                                error: function (e) {
                                                    console.error("请求异常。");
                                                }
                                            });
                                        }
                                    });
                                }
                            }, {
                                text: "驳回",
                                cls: "btn-danger btn-sm",
                                visible: function (i, d) {
                                    return d.unionApproveStatus2 != 1 && d.unionApproveStatus2 != 4;
                                },
                                handle: function (index, d) {
                                    bootbox.confirm("确定该操作？", function (result) {
                                        if (result){
                                            var requestUrl = App.href + "/api/score/approve/rensheAccept/rensheBackFinish3?id=" + d.id;
                                            $.ajax({
                                                type: "POST",
                                                dataType: "json",
                                                url: requestUrl,
                                                success: function (data) {
                                                    grid.reload();
                                                },
                                                error: function (e) {
                                                    console.error("请求异常。");
                                                }
                                            });
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

})(jQuery, window, document);

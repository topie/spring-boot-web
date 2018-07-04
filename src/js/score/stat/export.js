/**
 * Created by chenguojun on 8/10/16.
 */
;
(function ($, window, document, undefined) {
    var uploadMapping = {
        "/api/score/stat/export/list1": "exportList1",
        "/api/score/stat/export/list2": "exportList2"
    };
    App.requestMapping = $.extend({}, window.App.requestMapping, uploadMapping);
    App.exportList1 = {
        page: function (title) {
            window.App.content.empty();
            window.App.title(title);
            var content = $('<div class="panel-body" >' +
                '<div class="row">' +
                '<div class="col-md-12" >' +
                '<div class="panel panel-default" >' +
                '<div class="panel-heading">列表1</div>' +
                '<div class="panel-body" id="grid"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            window.App.content.append(content);
            var columns = [
                {
                    title: '受理编号',
                    field: 'ACCEPT_NUMBER'
                }, {
                    title: '身份证号',
                    field: 'ID_NUMBER'
                }, {
                    title: '姓名',
                    field: 'NAME'
                }, {
                    title: '受理日期',
                    field: 'RESERVATION_DATE'
                }, {
                    title: '性别',
                    field: 'SEX'
                }, {
                    title: '文化程度',
                    field: 'CULTURE_DEGREE'
                }, {
                    title: '现有职业资格',
                    field: 'PROFESSION_TYPE'
                }, {
                    title: '工种',
                    field: 'JOB_TYPE'
                }, {
                    title: '单位名称',
                    field: 'COMPANY_NAME'
                }, {
                    title: '单位电话',
                    field: 'COMPANY_MOBILE'
                }, {
                    title: '本人电话',
                    field: 'SELF_PHONE'
                }, {
                    title: '证书编号',
                    field: 'CERTIFICATE_CODE'
                }, {
                    title: '发证机关',
                    field: 'ISSUING_AUTHORITY'
                }, {
                    title: '发证日期',
                    field: 'ISSUING_DATE'
                }
            ];
            var search = [
                {
                    type: 'select',
                    name: 'batchId',
                    id: 'batchId',
                    label: '批次',
                    itemsUrl: App.href + '/api/score/batchConf/options'
                },
                {
                    type: 'text',
                    name: 'idNumber',
                    id: 'idNumber',
                    label: '身份证号'
                }
            ];
            var grid;
            var options = {
                url: App.href + "/api/score/stat/export/list1",
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
                actionColumnText: "操作",//操作列文本
                actionColumnWidth: "20%",
                search: {
                    rowEleNum: 2,
                    //搜索栏元素
                    items: search,
                    buttons: [
                        {
                            type: 'button',
                            text: '导出',
                            cls: "btn btn-danger btn-sm",
                            handle: function (g) {
                                var downloadUrl = App.href + "/api/score/stat/export/export1?" + g.$searchForm.serialize();
                                window.open(downloadUrl);
                            }
                        }
                    ]
                }
            };
            grid = window.App.content.find("#grid").orangeGrid(options);
        }
    };

    App.exportList2 = {
        page: function (title) {
            window.App.content.empty();
            window.App.title(title);
            var content = $('<div class="panel-body" >' +
                '<div class="row">' +
                '<div class="col-md-12" >' +
                '<div class="panel panel-default" >' +
                '<div class="panel-heading">列表2</div>' +
                '<div class="panel-body" id="grid"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            window.App.content.append(content);
            var columns = [
                {
                    title: '受理编号',
                    field: 'ACCEPT_NUMBER'
                }, {
                    title: '申请人类型',
                    field: 'APPLICANT_TYPE'
                }, {
                    title: '姓名',
                    field: 'NAME'
                }, {
                    title: '身份证号',
                    field: 'ID_NUMBER'
                }, {
                    title: '职业资格',
                    field: 'PROFESSION_TYPE'
                }, {
                    title: '工种',
                    field: 'JOB_TYPE'
                }, {
                    title: '专业',
                    field: 'PROFESSION'
                }, {
                    title: '拟落户地区',
                    field: 'REGION'
                }, {
                    title: '户口所在地',
                    field: 'MOVE_REGISTERED_OFFICE'
                }
            ];
            var search = [
                {
                    type: 'select',
                    name: 'batchId',
                    id: 'batchId',
                    label: '批次',
                    itemsUrl: App.href + '/api/score/batchConf/options'
                },
                {
                    type: 'text',
                    name: 'idNumber',
                    id: 'idNumber',
                    label: '身份证号'
                }
            ];
            var grid;
            var options = {
                url: App.href + "/api/score/stat/export/list2",
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
                actionColumnText: "操作",//操作列文本
                actionColumnWidth: "20%",
                search: {
                    rowEleNum: 2,
                    //搜索栏元素
                    items: search,
                    buttons: [
                        {
                            type: 'button',
                            text: '导出',
                            cls: "btn btn-danger btn-sm",
                            handle: function (g) {
                                var downloadUrl = App.href + "/api/score/stat/export/export2?" + g.$searchForm.serialize();
                                window.open(downloadUrl);
                            }
                        }
                    ]
                }
            };
            grid = window.App.content.find("#grid").orangeGrid(options);
        }
    };

})(jQuery, window, document);
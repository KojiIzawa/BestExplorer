/*
    << BEST_EXPLORER.js >>
    This file is to manage this application functionaly.
    all rights reserved by Savvvy inc.
*/
var fullTree;
$.ajax({
  url :"./php/select_tree.php",
  data : fullTree,
  method : "GET",
  dataType : "json",
  success : function(fullTree){
    $("#jstree").jstree({
      "core" : {
        "data" :fullTree,
        "themes": { 'stripes': true },
        "check_callback" : true
       },
       // icon of node.
       "types" : {    // png file spec is 16x16
         "home" : { "icon" : "./icon/home.png" },
         "folder" : { "icon" : "./icon/folder.png" },
         "file" : { "icon" : "./icon/file2.png" },
         "mail" : { "icon" : "./icon/mail.png" },
         "spread" : { "icon" : "./icon/file1.png" },
         "default" : { "icon" : "./icon/file2.png" }
       },
       "contextmenu" : {
         "items": function () {
           return {
             "Create": {
               "label": "Create",
               "icon": "./icon/plus.png",
               "submenu" :{
                   "create_service" : {
                       "seperator_before" : false,
                       "seperator_after" : false,
                       "label" : "folder",
                       "icon": "./icon/folder.png",
                       "action": function (data) {
                           var ref = $.jstree.reference(data.reference);
                               sel = ref.get_selected();
                           if(!sel.length) { return false; }
                           sel = sel[0];
                           sel = ref.create_node(sel, {"type":"folder"});
                           if(sel) { ref.edit(sel); }
                       }
                   },
                   "create_application" : {
                       "seperator_before" : false,
                       "seperator_after" : false,
                       "label" : "file",
                       "icon": "./icon/file2.png",
                       "action": function (data) {
                           var ref = $.jstree.reference(data.reference);
                               sel = ref.get_selected();
                           if(!sel.length) { return false; }
                           sel = sel[0];
                           sel = ref.create_node(sel, {"type":"file"});
                           if(sel) { ref.edit(sel); }
                       }
                   }
               }
              //  "action": function (data) {
              //    var ref = $.jstree.reference(data.reference);
              //        sel = ref.get_selected();
              //    if(!sel.length) { return false; }
              //    sel = sel[0];
              //    sel = ref.create_node(sel, {"type":"file"});
              //    if(sel) { ref.edit(sel); }
              //  }
             },
             "Rename": {
               "label": "Rename",
               "icon": "./icon/pencil.png",
               "action": function (data) {
                 var inst = $.jstree.reference(data.reference);
                 obj = inst.get_node(data.reference);
                 inst.edit(obj);
               }
             },
             "Delete": {
               "label": "Delete",
               "action": function (data) {
                 var ref = $.jstree.reference(data.reference),
                     sel = ref.get_selected();
                 if(!sel.length) { return false; }
                 ref.delete_node(sel);
               }
             }
           };
         }
       },

       "plugins" : [ "contextmenu", "dnd", "changed", "wholerow", "types", "state" ]
    })
    // console.log(fullTree);
    ;
  }
});

// 💫 Event listener
// $(function() {
//   //  alert(arrayCollection);
//   var j_id, j_parent, j_text, j_position;
//
//   $("#jstree")
//   // Event which is invoked when added new node.
//   .on("create_node.jstree", function(e, data){
//     console.log(data);
//     console.log(data.node.type);
//     $.ajax({
//       url : "./php/new_node_created.php",
//       data : {
//             "jid" : data.node.id,
//             "jparent" : data.node.parent,
//             "jtext" : data.node.text,
//             "jposition" : data.position,
//             "jicon" : data.node.type
//         },
//       method : "POST",
//       dataType : "json",
//     })
//   })
//
//   // Event which is invoked when rename node text.
//   .on("rename_node.jstree", function(e, data){
//     $.ajax({
//       url : "./php/rename_node_text.php",
//       data : {
//             "jid" : data.node.id,
//             "jparent" : data.node.parent,
//             "jtext" : data.node.text
//             // "jposition" : data.position
//         },
//       method : "POST",
//       dataType : "json",
//     })
//   })
//
//   // Event which is invoked when remove node text.
//   // .on("remove_node.jstree", function(e, data){
//   .on("delete_node.jstree", function(e, data){
//     console.log("delete_node");
//     $.ajax({
//       url : "./php/remove_node.php",
//       data : {
//             "jid" : data.node.id,
//             "jparent" : data.node.parent,
//             "jtext" : data.node.text,
//             "jposition" : data.position
//         },
//       method : "POST",
//       dataType : "json",
//     })
//   })
//
//
//     // apply to "changed" plugins
//   .on("changed.jstree", function(e, data) {
//     console.log("changed.jstree");
//     var i, j, r = [];
//     for(i = 0, j = data.selected.length; i < j; i++) { // 複数行選択の処理
//       r.push(data.instance.get_node(data.selected[i]).id);
//       r.push(data.instance.get_node(data.selected[i]).parent);
//       r.push(data.instance.get_node(data.selected[i]).text);
//       j_id = data.instance.get_node(data.selected[i]).id;
//       j_parent = data.instance.get_node(data.selected[i]).parent;
//       j_text = data.instance.get_node(data.selected[i]).text;
//       j_position = data.position;
//
//       console.log(j_id);
//       console.log(j_parent);
//       console.log(j_text);
//       console.log("changed.jstree.position : ", j_position);
//     }
//     // console.log(r.join(', '));
//     console.log(data.changed.selected);
//     // console.log(data.changed.deselected);
//   })
//
//   //.on("set_text.jstree", function(e, data){}) //　よくわからないイベント。。
//
//   .on("select_node.jstree", function(e, data){
//     j_text = data.node.text;
//     j_parent = data.node.parent;
//     j_position = data.position;
//     console.log("select_node.text : ", j_text);
//     console.log("select_node.parent : ", j_parent);
//     console.log("select_node.position : ", j_position);
//   })
// });

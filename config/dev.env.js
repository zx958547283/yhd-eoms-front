"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/eoms"',
  IMG_UPLOAD_ACTION: '"http://127.0.0.1:8088/eoms/common/uploadFile"',
  EXCEL_UPLOAD_ACTION: '"http://192.168.7.197:8088/eoms/gms/importQuestion"',
  JAVA_UPLOAD_ACTION:
    '"http://192.168.7.197:8088/eoms/common/uploadFileByFormerName"',
  // BASE_API: '"/qbeoms"',
  // IMG_UPLOAD_ACTION: '"https://www.laohaowaner.com/qbeoms/common/uploadFile"',
  // JAVA_UPLOAD_ACTION: '"https://www.laohaowaner.com/qbeoms/common/uploadFileByFormerName"',
  // EXCEL_UPLOAD_ACTION: '"https://www.laohaowaner.com/qbeoms/gms/importQuestion"',
  QA_TYPE_PATH: '"qaType/"',
  LEVEL_ICON_PATH: '"levelicon/"',
  GRADE_ICON_PATH: '"gradeicon/"',
  GAME_TOOL_PATH: '"gametool/"',
  BGM_UPLOAD_PATH: '"bgm/"',
  QUESTION_UPLOAD_PATH: '"excel/"',
  NORMAL_UPLOAD_PATH: '"normal/"',
  QB_LEVEL_UPLOAD_PATH: '"qblevel/"',
  REDIO_UPLOAD_PATH: '"redio/"',
  username: '"admin"',
  password: '"123456"',
  SIMPLE_JOB_FILE_PATH:
    '"E:/svnwork/tianMai/platform/work/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/com.lz.resources/upload/file/RunNowJob.java"'
});

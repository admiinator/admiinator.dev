var express = require('express');
var router = express.Router();
var msgs = {
  400: "잘못된 경로로 들어오신 것 같은데요??",
  401: "로그인을 다시 해보세요",
  403: "본 페이지를 조회할 권한이 없으십니다",
  404: "아니 없어요 그냥...",
  500: "어 이게 아닌데... 서버측에서 오류가...ㅠㅠ",
  503: "현재 요청을 처리할 수 없습니다.\n약 10분 뒤에 다시 시도해주세요."
}
/* GET users listing. */
router.get('/:code', (req, res, next) => {
  console.log("error page called")
  var code = msgs[req.params.code] ? req.params.code : res.redirect(`/err/${404}`);
  res.render('error', {error: code, message: msgs[code]})
});

module.exports = router;

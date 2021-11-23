const jsname = '晶彩天气看看赚'
const $ = Env(jsname)
const notifyFlag = 1; //0为关闭通知，1为打开通知,默认为1
const logDebug = 0

const notify = $.isNode() ? require('./sendNotify') : '';
let notifyStr = ''

let rndtime = "" //毫秒
let httpResult //global buffer

let jctqCookieArr = []
let jctqLookStartbodyArr = []

let userCookie = ''
let jctqCookie = 'access=4G&app-version=8.3.8.1&app_name=jckd_app&app_version=8.3.8.1&carrier=%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1&channel=c1005&device_brand=SMARTISAN&device_id=51426980&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202111161441&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1637564766&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=GFsSOfXcbejQ%3DzsLToxWkbStrMy-l4aAFoKU_B0MeXK7mH&s_im=8pnoxxlgBSPY%3DftJU16u0felTt5IexLbZSA%3D%3D&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&uid=55242014&version_code=838&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdl2qFooaZr6m6apqGcXY&zqkey_id=67a2b7bd2cca47bfdd05405d10af9fe6&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFwcC12ZXJzaW9uIjoiOC4zLjguMSIsImFwcF9uYW1lIjoiamNrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjguMy44LjEiLCJjYXJyaWVyIjoiJUU0JUI4JUFEJUU1JTlCJUJEJUU3JTk0JUI1JUU0JUJGJUExIiwiY2hhbm5lbCI6ImMxMDA1IiwiZGV2aWNlX2JyYW5kIjoiU01BUlRJU0FOIiwiZGV2aWNlX2lkIjoiNTE0MjY5ODAiLCJkZXZpY2VfbW9kZWwiOiJTTTkxOSIsImRldmljZV9wbGF0Zm9ybSI6ImFuZHJvaWQiLCJkZXZpY2VfdHlwZSI6ImFuZHJvaWQiLCJkcGkiOiI1NjAiLCJpbm5lcl92ZXJzaW9uIjoiMjAyMTExMTYxNDQxIiwibGFuZ3VhZ2UiOiJ6aC1DTiIsIm1lbW9yeSI6IjUiLCJtaSI6IjAiLCJtb2JpbGVfdHlwZSI6IjEiLCJuZXRfdHlwZSI6IjIiLCJuZXR3b3JrX3R5cGUiOiI0RyIsIm9wZW51ZGlkIjoiNmY5YzIxODAyZTllN2Q2OSIsIm9zX2FwaSI6IjIzIiwib3NfdmVyc2lvbiI6Ik1YQjQ4VCtyZWxlYXNlLWtleXMiLCJyZXF1ZXN0X3RpbWUiOiIxNjM3NTY0NzY2IiwicmVzb2x1dGlvbiI6IjE0NDB4MjU2MCIsInJvbV92ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInNfYWQiOiJHRnNTT2ZYY2JlalElM0R6c0xUb3hXa2JTdHJNeS1sNGFBRm9LVV9CME1lWEs3bUgiLCJzX2ltIjoiOHBub3h4bGdCU1BZJTNEZnRKVTE2dTBmZWxUdDVJZXhMYlpTQSUzRCUzRCIsInNpbSI6IjEiLCJzbV9kZXZpY2VfaWQiOiIyMDIxMDkyOTE2MDUyNzdjZDJlMzVjNzkxMWJjYmIzZjMwYTBmZWNjMjhhMTJiMDFiMjBiODMxYTIxOTc0NCIsInN0b3JhZ2UiOiI1Mi42MiIsInN1YnYiOiIxLjIuMiIsInVpZCI6IjU1MjQyMDE0IiwidmVyc2lvbl9jb2RlIjoiODM4IiwienFrZXkiOiJNREF3TURBd01EQXdNSkNNcE4tdzA5V3RnNS1CYjM2ZWg2Q1BxSHVhbEllamw2LUZyV0t3elhXeGhYeXA0TERQeUdsOW9ucWtqM1pxWUphOFk4OThuYWpXc0p1cFpMRGRsMnFGb29hWnI2bTZhcHFHY1hZIiwienFrZXlfaWQiOiI2N2EyYjdiZDJjY2E0N2JmZGQwNTQwNWQxMGFmOWZlNiJ9.cSD8O3FX7XlGWPidJpV-JvF_2ttO5yqFCAgO4k-QM9X-g2HNqTLKH2XXqWJfB8q7Fa-_VghAidoGUhe-7wS31A'
let jctqLookStartbody = 'p=ROPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNXQlP-aNxWb9fFUK9m1BPJIoCJVhw-l_juBle7macYeoUS4luAeU5lO2qOlPfSLGJ_wyi91cAXk9l5VXG-_nz2ljIdhw0eg4IfEH_k3mleptndUqgEDcnLy_zw5ip3xFbPvCDFiBI_OWXACl-8V5NzOGhpfInlRk6cCP-1RB4xtOEuxXYrX_h_1IqSE3i0urQU-gzlI0Ek_PUj8qA1Ew0JWo47Bc8WxfeNpNLlDrT65kr94k-GyD7ZvmZ9iu9-rwRglZ99xrLYSjl1pMLEqvhyOsZMLTJ5u-sHOQ0UiE7e_DIa9frJb5ZWdFfoeC-Y5QIxHD7QfgUpmHH44lDd0_UGIzAbIpeD6_cNj6MLZWcJz7uTOT4EwdNWrIccQHEiwxELmrAxipmACxpXzVGdw7lNG5CaT5f1tn3RmH9tkf5FiU4AolLG058BaqubZ4AXZC0Wmm0QDJQJ_QpCpOtx1W0iJsplaOE7JktLWucXEWZsZTy3lR2WleXlNJELD3_gbh0rjX7ORW-K2HRKnPfziveIyeJ9SugJmVpZUsw_z4Bwlf9DMGD0dPNzvYbv6f61eTDEuyvlxCygVRp0G2v3TXPI5b2sT-i9vxheeZGRklqNuO-_L8REMt8MsbdRCNWmVWIr2tLzDF-hhXRIHSRi91urUnrxW4CbF_GJUQbhpMEai1puCsFpXfmcowBpEs28om5EPhH7qWhiyCHVjNmy_fFA4dgcIRv6rKrGBniYoraBcCNBugAzlYrxpptK39ou6YxuhmZMskPoxZm8RlC0nRJWpwp1Et7OTC7xURSmpJwKLUkebfJU4YorZCarxeoj4w_HMgxZ2KjmOnKhr541KC8S-wilolQEVgF9bRSLuW3_op02uDpUq7jzXGB_SuuqYrcquBcoduzaO_R44X_o_FrU3THSL_Dxd0hL3z1lM2X6PynWEOQqaoA7b9iDzMZ71hsTD3URUe3Y1lMAofdDXAJRSN_BXcqif0e1iI0omxv3c858VnVY4wZVHIOSmNU1wEUHkOX7ZxMn1oR7m8r62lC5fTVclvlLIJ3hoSbxQ8vqcRSTFeskp1q8Nd1_ymJlSl54=bE&p=ObnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCIh3DtkFTwNb1dEq_fVgPyQrGHCI9WPCn1DVLrCaHYkoL2U62BQ_UAIsE1TBmDt6pwOlUwljhJ_mgsmiekVrpbkj7o90fk39JmUQyKuC2TR1m81jRfklLXaXABX7ycUV2lk58YYGxT7cfloJyyCZndek1HKefv9sPy5lYhFxXZkJKiCAYo5tXNnD_pbSFj9xtpEV_nTmF3azGLVfSuNmzn5dUmOXhqUBiyjFnhsaT153Q58Sy4XJdrqkkVXnZGLLLSrAtRc5mv1eXAVxBThXnzFaQAuKDtcabZ8aLjo17ds3U04R5noOrdLUAkiBuEWbgLTyl1VDnbx8_YVuGrphukjbSA0ZUBZDJp0kZuNO1PJDnt1DFDlGTL4Nw-VswUITLTkdobFLNCyQP0pX0UawIqTC_dYD4IAe4T9cKzB-DCVMEqbI5opJffUKremDrRk9vbBkdA-_He2z9upNQobWQBF1Oh8WdTBKWLR0bZDqXCZk-JHp3n6h6fcDfUxw9-sOg02CbT0j1YgeUOION7-KqP16hNlW2f00Z1YE-0l4PpsG3udqDznIPhOZtrHErjPTVNBrlJUdjwv-63dcfAVjmstYmpvC5lwJwm4eoquCZDeqr44NWC4wB1B4SYYiT-75BTlNp9EO88cSSImZ68bm9FskPskexZT_oBeVf2N8j74S-H1c3gCA03eJDdxdkMYW6p8Kwu-vZsEwd34w9P9_y0KNj-alJ2ZF-ocJe3jovv-tIC5Olq-tw38qVeUzcAskAWlCJwOZw7ZZh-sgJgFxb-_9zJLQz1BoDK2P-dSsnmS0XSVhMb6T4vCMD3lMzI2AlAiPfwnEKl1SLZEbXmjhJuB0KZYWfM-FRo2g2TMv9_tDyRNYfQS49qYcvjlabeErQsvYUGXGyAtM5vfMrv56VDI9ovDXkwSYT3wU2rj06vFRt6d7Sh7hgcMBeyJq6NcpDHH73ZtX1WsMg5CrMXXCHpJnZ-Z1lqNg15ufBuTZbsLUCuwYneGIEz8vKZh4pNXuXUbxEpjN_vCVuvgeiAmp9Dju8FwQ6amjciSONd7CBXbnM11eWXVocp2DpG8sucWj68=& p=ITptMzLWs9eU=uciQbPpLErmtPT7VrZKgcZLS5bhJ3yikyEKCmE-YD43hikhgmKiAgErLMXclZWUEoBjjZLKA8KKcg1yGwCQUxmwQiVqu6uE57dZs97MLjK23BT4vAXPCAOf2TQeYKATEQ9JgXeua_Ee6mIdCmfSYAlhZF3iZKAI4uh1tsD08GTboaR4wr__5HjbVqe2q_T0iSeCj-I0H4gSqjXdlt_cp-KtVjbOThDNf_IZ9UsVCKKwWSwnD20hKOBtGdZlIpeQr1wHMIrL3rbPMAgr27Q3Un-hEAFmpXqweHIusjX1Ldm9n5_Z9jIQJmAI-_OsqliWvl0P-nBvnhuXLZx-y6FTfIUQgWPL4mFkw2gIOPb-wuRdQWCyWCqhXc9cNMBI9KtOTEnsAaZ43V5cHGXXA78zHZ9t_0D9Ya6z0pClCt0waXg2sEjyEK0di3QA1DqU_Z4V1mRS9wbBNYkQ11zj9cTCFHnefuibzPcgJEnIs8CNCuNhevRWCyaAuW9Yf06PFo4vXH08b9Rqj91Bo9S9xVEbxkStzg0_TVz0i4EAbpJ8tAAC1rh9M0PYCxZ6eMPaLshTE0ez28jyHjB47V9jNF3UkGbpmJuMQe-pyLoxz6Nsxx3JsXO-Psy3EhBFf5-DsetWY0YXbBRKyAzDWnaPGFRHd3dpqdOlw1F6CFKvrf-z-iIzdHJT-Ramdn-MSwH9-B4D2Cs-ZYA5dMzMuunuRCo_xB4V0hYCIltSONbebR53iq3BljyrNU5f5--vsIF32losEeuX89fyoU92W9lzkIPkt_oC_Zu1S46-IhY1Y4GQvfdc7kkFcCihkalSbFQNwTbFMmgKsnQ6yYOENAR0v2OI7TKnAeAHf0ECex18I6CHgpdpaocDsy8VkgKVCOJxPweYFMU2iOLd3wThkHjQpYTL_INSeD8X8vLeZosxDmBTbzehnJM8Vl7A_L8iLZ9oK4iZii6CwfIBMHamD9V2BzayLuqP1iu3lDqmPAlDhOobkyKsV9s3fBl_HErw-5u22YIrZ5oxmFCTTxYZdzRQYbUlbTR1f2hbsgs17gj6T2bLHW6S9D5BeqyhpufWgkAn_R5U45apwXhCifiq2RyGjeSITw0UgGXB-zNNhLi-cXLJKRK0yTJre7cBLDcNTj_V1uwIKBnIDg-XX4mdCn7lJbQkgGWq8jqKdEgSK-Ba7BZjqNmE=& p=n9sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknh2jjMxW90LfgSXnzj4dwkhSfXN5HlrLJ7uZjFY6eiwETyfc7y2OJaneOvOFHNF0cc7jfTFE4Xj1pxU_miVCd-LLu8rhKTOUNcgvi7kIoCsfkMua83VAPhzETJdIhJkXmRDbw7jscwC5XdVkwLQiuaR6VBoyhE0BkmGx6WMcO1R0wIi021Px-nVOO1ClYKAYfOcePlybUaTaubdFORv16skPUigcovL0--cX8iAtWDZV9tAz3QO7nYaWLLvkpdXY_9MGxzKYb-8FN3pelH1Ra8KnJVCgexM7TWg6QW9VScPfyWtUwj0MLONpOOBTW-g20wYQme3E3MopLftGDEWcmJJRkEdhpOR8rLfntZ2CknDm-HheDDVDPRIVUQNL5xcceiSzBi8mi1PZyH-aUydCMqqGKtMa6UOls5f51sFN8aOr-9mL_IKw7b8p9NZBlb4991_9Pb0ONOrlWEBbQuZkpgbRqRdI8JDja4VmPJb2T4lD80gQwCuTBoXGDPXLZzMr3MkijTME6qwNMIMQ5ghcgaHpxXt2YwC2j07a_AeLofFZkyMTuLub9_sXVIe2V3H3QVAirw5HuPSalGk00yAdP5YDFzithL6jhl0ac9KrjjRGFAM0ekjN370ZtjQGaAv6R02IFpQdRxhAgc5Iks2TElxYBsi7A8CdE1WNXgwFhFJwkBHfTYBSMGrStUXUnjjZcrIELPHTGbwwG6-65QQVX0T0I-oey6k7w7mhiRsc0vWs-rFYi69pn-g_VV_DdbiLHXM0SAKUEP0jfQ9i1xx_mJEcGZdoFuio0hYGh5ibxiG_AX2ncxFfKcyViPaDauugbjjUiODyOdZg8Ww4ZNi8SVSbnuo1LOgHCb5dyVbsMKiUmbVA12D22VIziz_7JnNrIl_cJWzah6uvRi4AFV57iKJIPz0EC975mLLPvV-SU46Ju4XwAOQKC_scbhwDmnkL-ycY1aY6Q6t5mmV0Wz9RNX9902LuGS1j9h9GRZWCnMQFbe-0fU5qxlUVvXocfYVWV_v0yeXBoCk4Kj5DwMgTcpkJz8dMQy2ov8Wvvl5Zd3jeRZpdv2Cbk1WBmc7qW7Jrro=& p=MGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhCxU5ohFpckmhoBhfo2QChtUla9EU3JR7v972VcMQBI068A0e89Hj-VMQSqW1fuI0yBxPrYA6C9hJxXq-5w2UBH7kMYWjM3GwPvLG2gOyHmfqh5Cb3N_W0LEAtTm2i-XhTbsZwOQIs130llyYfdwF_Rh-mAjRF7VkZQ793vR7iHZnNKahg4CyJtl1WzShKl0gOmBEsSHK3Exxr2Xzdiz4zH4JURSCsJtIV8Wf4dV9p0Q8yC7GjnhGLLTkAi2sZWod9ncKeQ8FGzcMNAKT4Zrsi20z-EoKI9Xn8cxD72mmuX8sBEUAiZGS4cXmx8l-FwmiZR1SG-E4rUgr5itThkf4H6wZ8Ggkoy6-Zd0P-qXQsZFc2wUWfEOvWu9p4TL9oLcrgHVCX3VK9wk6GkECUMkd0gzl6oGA9eTBEuaXQiws3-x4xv1Ori8ox_ZYYdW3or0CkMnhB78hKP5VsU94MdkbhGvuWMlXxpIrxZTPGAVxCEmDfyneLlfl13L3ca03Lzbrp5JCr3Yt0MDad-RbBZ5jbXuWP9OxTUKh45soZA8zF0wWojF94QLcber3Su-Z4fOCaLzLB1N_bJDwXnuBCgVSQ3fuTrO82X9ttRwteO9oj4Q4eXYNV9geEQCw18ohkBdOyFtnVuKRwiWXSJnyeapzHtBxU8TjPVZAuqF4n_wQ1ArffyqsjrrSlg3FeCpdw_mHTv3xsN2XPStmAPohnWASPGmn3Re7oMTmE5uvxN7NsVp1pIPLY-XthB7DWSfmxhqJq6HhRgAJI0WqVRCe91a6S6tVPnxZCNtvhxoW7ZTl9VE70lve1aHoN-0UmKfhlP98EOi8FW3Vr6SV7bXY9QIIoE6HT0XIbx6aEBfoc_b7C85XNiH8MC8iBp9j9R79_bOYsbSR2774Hiq3LKTP8xyXd3uFv951phLZKigTM0ItLt-0LTrSwjKYhtHomAtDxjB0FGvNOI_i9CMJ4BbcksTogEioKFUijbC8YWqiMiC5b9YqWzGAtQNsFQavBkJP0LQkqezw-SV_RTv9W84afDIRyyhBZuYnSCLkxEcpJSeEfztTAdd-cfHUbkWQT8gi5hW44=2& p=7Aj8L0ZF5qmA=LJAg9DzaHXvs1KBzutYwhQmrsoMuunFyAGD4IBks7HPg6ztVTrKpJtQkfB8jCJlswrXJ1M7Uv81iu8GoNavJp8jKu6jRmMQNYaSSz1iNK_NIsv7GMxPkbwZ_GtQrcCa72rfrI1nPCgYHDl7c19tiJiPg_LQJzj5FzszyoFR_Eon1b7nT3r2Hax0a0uY6YohdDE9k8SfPIWb-sCes9BuO6PPP1QEgXFrQ-XdjvR77nGNgosJ7Xzyv8f6Xe1Slv41044jEcRdZ-NV5PqPkcczgMNk0PciUsD6iGGsZQwrnBa6uvbyi8GtawsP9hYNSAe1H1b0Vol88v6qWJWmCOcffLffDe8gd_chYRC5kp9DtPYQKp4lUixO8OteNd3lfgaXVsxqnrbsNp6wvabRT_F5HnNw948XUW0Sse3IbCFo4_BJAJ9vY1rBYdznJKP7sYKklb3OqLuLVdadu9K2QAJjT7jjnH7uR82-4b2aaB1j-UcmAhmyKJEv7S8PWIFQ9uc0XV32PdHnLYvKb4g-Leq_sRTQy5VjBWcEDbbMA0ylVkxQ-MUWd4dFjAGPqb7WQZ6ELX22NzYigONNmL9vM0Yk3iDhSr6v_OGWi-EMye040CRFiRiecygYfpsaF8_JxIfFW2T-_9x3vG4DLPLno5BUqyX0wdzgoBd-B2ckAEZ5vOEni3LBetnNYB8yqjmFlfyB51hmg-eh3I0k_nvU1F26Vpd2aRuWwjMs18RSG-Dlat0v9KTGVrPhaPUcOK4Bf8aXyHQ7H_ttfQTP9QemB8Simk2d2_PagIUcEtx1t8_c5b5WDpbxJ-7hwJaVOSWOUy8hskiVKwYI0sihxZhdh1UbFimQgpXBJOVflyXbNnFG6ucVj1Md8uBL8e_npYosVtXiOIRz3KgrNAc5WUQw0ehcdzT-xzoqqu-DS3YjjDdpNzxsJzdaRu0HI3hPBtRborFMZbPFy6id8f87Gc3CyhEcxo8QxsulLEnaXhMQYZFWXFHtKTtDVh5eZRnhQWAgu3ztOE3PSjfiE482Vprt-8GXvGmgMwipgBpwlYeG3wZ2GPFDv01GVirwhnyt_bxz0Lky_tf6Gsbf-ac1OiBYnpArduaD2BR4NAYYaLIXgUpnxYtMr5pfQKsCjjo9aTQ4jWX1m1yk8vWd-B_NLWiP61jLYylA9F83sHcYJSBKGPodbooY=ZT& p=4OPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNXQlP-aNxWb9fFUK9m1BPJIoCJVhw-l_juBle7macYeoUS4luAeU5lO2qOlPfSLGJ_wyi91cAXk9l5VXG-_nz2ljIdhw0eg4IfEH_k3mleptndUqgEDcnLy_zw5ip3xFbPvCDFiBI_OWXACl-8V5NzOGhpfInlRk6cCP-1RB4xtOEuxXYrX_h_1IqSE3i0urQU-gzlI0Ek_PUj8qA1Ew0JWo47Bc8WxfeNpNLlDrT65kr94k-GyD7ZvmZ9iu9-rwRglZ99xrLYSjl1pMLEqvhyOsZMLTJ5u-sHOQ0UiE7e_DIa9frJb5ZWdFfoeC-Y5QIxHD7QfgUpmHH44lDd0_UGIzAbIpeD6_cNj6MLZWcJz7uTOT4EwdNWrIccQHEiwxELmrAxipmACxpXzVGdw7lNG5CaT5f1tn3TycgizhR7NBd43irgB3a_ue17XBYkzOw8zx5YcVvpfjR2hznTmNHcBdYVGhylq5MZiNI0Nw_4QhUAeo1oXiSG0jiOA8SWmkCkciBFiIlGkDThAUH5sPZIqsdRUH2z-tOJgFNDwMC6yVDYjr103v4RrfrKCgoKEBG00-IO7KRGCv_m0H1tcneHR8hOXsY9RWV2S6My_aeCKO5QAaAGdeGLJLNRVSD3aaPGIKfI3qJYiAqgQ35uqD0HC99-10Ae8BxPQ-QXJj6jU7uG4bUC1qLrHWzmwfsP7lm6KmP46DQrYVA_Bq4HukjhIsCbY3MQJGExTamT8Gqxm_S-haB9cELsI6xX6R2aFG8yaH3UiP5Dio2pPO08Lkq5Cx-etmHUtTJLpOU-R8lt_HofIEMfv8FuIoTYsRFp9-cs_mlJzJQOleE2usRFTXCDVWKlS_jPCeCnkxoK_Jn2r3cGq8z3YF6S0DKWdBGDrcIhVx5lVLe0RXOLgq_Ggj2J9WQAFdDKpxVLuL1rfG2-gnB8NnpMyts0k4j-eDS9s7JQ0VxDFCGO3DQP-WgpFar4slvvKSIdFzN03QUCRu6VZ6Lx12UYSDkSGAuaM8qiaTk11ROVPq2hXGSnHjEPGTYBZi1hQk5P7_LyLrj09AoH6CokG7zT-DguSlHE4zEz5XYU=TX& p=h-TH-oVqMAXs=Jo5cyCldqpRi6PPrwcWoOG_X5mMn4QESxYaxOAZ8RN2hIxlf4m5JZ7cdQtVdDtDIMc7_CPaJg1WbQchWt6QsCw7HQPzD5MEAmTA0kFlePXVb3o67YgfhTHG21VqZI18vKtEa3KIIPcz1u303lWHge2cKIxrhzHgcYqckPXpW0EsZ65ir4sNpAnOm3EenAaKgyOzHXodB6wfC02DAScDdRhyWnOsDfa1lflDBGfYZtdRxW3hODO-SYXMLwqNFNbhlR1NyVCGwfhSF_Axj-W939IUhk-HxWKlJYKGhN9mj03pfNLtQtcU-jizRkZLwYQScO7qzteRlyBsw-7qOtbrv5Hw1j0UGZ8aV547uNoBOzku7_Zv8xOTfhl2qP1xJQ4w-RhUELsf0v6QvgcpD5kw5IZ36tq_d0jvOKogRgwfO_rkGoz1nsXYBvuyN32yHGV9PEmkqz5FqvTbhtAPq7jS8o00VJ6diL6k6zab-ldsmvi36lyjmEnt3L9cdEC71VKyJ1VVmQGvZkPRI0YlShZxijhs6tyaah-8GAWmdObiE868Czb-5J-bzgIg-8au8d9kooo5pRkFMATaiWWL33Jo8VDNkXgTwGVCmbX2sBexxFeslJiCbbyV38o5rNI5lalmZ7W-gAGzMH6QvYxX6Q-V7OIGV2sJ1ZcoFMozC5ft35X63eHAgEsjvkYM49JdXe54wJyBWL1zYHTA0W6YIlCiDhXxENuenl1TpmZgbx-armQvhzVq9NrMY7TV-8v6hER44LXcC9a5R7I__8AHfhFgF7x3vO-_QzthrfBgsG9e9gDANqaFoxB7E3JBxWEb74LIgkHxV92mu1ROknEBoyE1AR5TJ9pxuENME3ZIjGFnFrVkIuYg52J1xsGhM4b1IJEdxZ4r1FmORyi1ADxDggqwj_2CSskvmIly0ZySzcFF-TbgX-_7nKaPCSDw-gWo4AmUKxJTX4ocQWkTnaM_Re0dpc_KH8XJgbxb5rW-TOpU2Tom6TPru9Oixo5GOSNa--P12QXyex4KssyOGhTNwtvUPC1w8qIZVzEyzHXdBfDorWP_fbElo4zo7FgHbTntxL-QsXOG3P98t56CX1Bca-t6HV6Fxdg9HMikCdrIZHPtzj44Bly8VMQMNfKdwzV0iW3sRY9P8FBA91StShcZN6NgT_qrYpDlSeaUPuBsND0xihMI=Q& p=AAj8L0ZF5qmA=LJAg9DzaHXvs1KBzutYwhQmrsoMuunFyAGD4IBks7HPg6ztVTrKpJtQkfB8jCJlswrXJ1M7Uv81iu8GoNavJp8jKu6jRmMQNYaSSz1iNK_NIsv7GMxPkbwZ_GtQrcCa72rfrI1nPCgYHDl7c19tiJiPg_LQJzj5FzszyoFR_Eon1b7nT3r2Hax0a0uY6YohdDE9k8SfPIWb-sCes9BuO6PPP1QEgXFrQ-XdjvR77nGNgosJ7Xzyv8f6Xe1Slv41044jEcRdZ-NV5PqPkcczgMNk0PciUsD6iGGsZQwrnBa6uvbyi8GtawsP9hYNSAe1H1b0Vol88v6qWJWmCOcffLffDe8gd_chYRC5kp9DtPYQKp4lUixO8OteNd3lfgaXVsxqnrbsNp6wvabRT_F5HnNw948XUW0Sse3IbCFo4_BJAJ9vY1rBYdznJKP7sYKklb3OqLuLVdadu9K2QAJjT7jjnH7uR82-4b2aaB1j-UcmAhmyKJEv7S8PWIFQ9uc0XV32PdHnLYvL0gwUHqR6kXSNp4qqG9cFaleeFNzVE8Va72HqeLtpmBH9Mc0nep1Vc7fCUfcU0MTwHZqmzDz2M9IWM_wW2FMSx5DjLcoQiXmWUblpxZEwmIifbqKZTYXito7C85eAyl8woOfw3-eIgliqGsDEdF4zoOoNmXlDYFumrWYH4DCIULoR2t-_gjf7oMRSXO80gb_7WJ2-oxBEN3G0dAI-TXXV7emYOOto5zisJ6hu2To1NAfQbug9FwTekh0_AS4lQIQKosL1JC4SrAJXatb964DYEuZX0C_Wfq4qsxgTSBgS4WaLWt7t3DSk6Qtgrh1iRqABAJaUz5Ku8MgTpn-W9bVdMgUhN7w0v-eseo8MbOIntmDxylBhRcCGRYJQy-tcRzYMdDtB1VxCiue0ks0yalFEFlF1mhE1sb-w5QaitL9xViGP0ily_T-Ep3i4QLp1igz56u4zeunnHMlqS4YlIYL7KHteDmwRgk0YrJsVXGb6SIfrQtvs-e7ykosBcVa-z5_yk2o06sCOaUGaZmN0JkW36EE6oxpsqfsFHvmCAV1KqJ2bTEG36DVZoZ23H37bk0_NtuAk8oWcAIuMHALAffvE7l7MlHCPvj7RJCfxKesUQTrRiRv_adG96tCztZ3gdeYNjW5zkiQsnbg_V-jc-34hTA0Irxf8-wgc=Cw& p=29sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknh2jjMxW90LfgSXnzj4dwkhSfXN5HlrLJ7uZjFY6eiwETyfc7y2OJaneOvOFHNF0cc7jfTFE4Xj1pxU_miVCd-LLu8rhKTOUNcgvi7kIoCsfkMua83VAPhzETJdIhJkXmRDbw7jscwC5XdVkwLQiuaR6VBoyhE0BkmGx6WMcO1R0wIi021Px-nVOO1ClYKAYfOcePlybUaTaubdFORv16skPUigcovL0--cX8iAtWDZV9tAz3QO7nYaWLLvkpdXY_9MGxzKYb-8FN3pelH1Ra8KnJVCgexM7TWg6QW9VScPfyWtUwj0MLONpOOBTW-g20wYQme3E3MopLftGDEWcmJJRkEdhpOR8rLfntZ2CknDm-HheDDVDPRIVUQNL5xcceiSzBi8mi1PZyH-aUydCMqqGKtMa6UOls5VCr2Ai56Z5b3L30xYthCwpYwH-hZQjQ_SGZc_JkNcdJN_hw5s6l5OQQYa7QNeeCHUOYaonlFTdc1bnk1TL5xjshIXJfciVrWaVh3KLe69vnn3qrJU1YtWzfWbrs1mjIyGiI9D4PVuM4VRxZnTe3UIan87uGAWtRnKmIywQ1-WmgtnOTB50bpzj6rDdYj-jRs9x0bJ1E48HXSjZLvFDGmLqCCDwfPxvgd7ksciZT7MKTvvtDowRH8LQiZxL6SoCxjC2DoGvcIi20ECBoYUYL9Rmw1ZYrpV1WNXVwc7_UX61T4GT5WZln1jJOFj4c1S_fW3p2Eeg1KilBudbGD9hkcYI31fvYW4_MHwUQCe_pH568AEs8DWSUZg7krfaMCMLojBpdG_l9lPR44XlKfw6Zngvpwc4FTYQTI8peycj6Mgp5j0WYglJ71Xl67YcpMOX967yUv-Wi-SgU6IZsHYxU63vOzI6EV11bPz4Kw7q29WTtHHMKq0HowRcKNI_rfx9vLyS1C3jSHkCGPtGJHtl_vkPrRWvn4KYN2BdgqR7ECR-Dnudk8hVkJbpgb_c4vivr0sETr4cOK1a7LYZ5wqsiYUpo5S7alFLKygsrMqdHM1Xv3CuP80kiYE4Jlw4imC821d2trPBEBYvFXS1IJl26DnjBPaJxQStDM=& p=WGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhCxU5ohFpckmhoBhfo2QChtUla9EU3JR7v972VcMQBI068A0e89Hj-VMQSqW1fuI0yBxPrYA6C9hJxXq-5w2UBH7kMYWjM3GwPvLG2gOyHmfqh5Cb3N_W0LEAtTm2i-XhTbsZwOQIs130llyYfdwF_Rh-mAjRF7VkZQ793vR7iHZnNKahg4CyJtl1WzShKl0gOmBEsSHK3Exxr2Xzdiz4zH4JURSCsJtIV8Wf4dV9p0Q8yC7GjnhGLLTkAi2sZWod9ncKeQ8FGzcMNAKT4Zrsi20z-EoKI9Xn8cxD72mmuX8sBEUAiZGS4cXmx8l-FwmiZR1SG-E4rUgr5itThkf4H6wZ8Ggkoy6-Zd0P-qXQsZFc2wUWfEOvWu9p4TL9oLcrgHVCX3VK9wk6GkECUMkd0gzl6oGA9eTBGbTmmuIC34WmoAp8ORAHIr5C_MV1MT4V27ZWbkBo2EWcxkZT-HGdA4iL4e8QvqCG1om9lQtLKYJ55l2GZPS3aCuEJURH41ep7nWd_ddFnll4TT8wHjho6Ir7kEyRLCKFWtHTzHe_Qba_Ip01ErrC2rQTf0mbBf5OHm1ezTY6roBUTOGgaukoMHPD2JRB6_ffxBHfKKahuguajfvUMOJeboR_z-D19rbeveV6go8_gvwhLfG8svZlN3uXB3KtS_mXDRHty90nncEDiHfhr6fRsL7FdpRBosTyujiKofF0uSc6QmxKfR7zOEGPg6pz8rq5z4G2ye6gaZdZAlPRgQYxo6yMI8wJtuk9KYNeQQ31ifQ1pm-iRQAdXLll0r7AC8DiHeMk6DHL0F1BTi28Crxr8WEkDUqvwt1sth0bbywVQ-dHP1RJ1Utmweug8T19IajkdPnQVvRy0c9f6agmcb1vvnm8cwZX0uaVTLQ_prqZ5zqEg731tWYOskV7YDbE5KMoQw6FGLCxb6NcLWgrNTQ6qbLTZDy8BHyitw7BmVoDtVIArckL0tlGIBF5ONzzPUb3-btLWWWUcOoPGTmBbdVKHSYVHLFGh9lTAdImOvd-fORyP7i6A_DAGRqqcimAHm8o5UpS3gWfSh8_FtQkMkPl6SJUWdK83pns8=e& p=YbnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCIh3DtkFTwNb1dEq_fVgPyQrGHCI9WPCn1DVLrCaHYkoL2U62BQ_UAIsE1TBmDt6pwOlUwljhJ_mgsmiekVrpbkj7o90fk39JmUQyKuC2TR1m81jRfklLXaXABX7ycUV2lk58YYGxT7cfloJyyCZndek1HKefv9sPy5lYhFxXZkJKiCAYo5tXNnD_pbSFj9xtpEV_nTmF3azGLVfSuNmzn5dUmOXhqUBiyjFnhsaT153Q58Sy4XJdrqkkVXnZGLLLSrAtRc5mv1eXAVxBThXnzFaQAuKDtcabZ8aLjo17ds3U04R5noOrdLUAkiBuEWbgLTyl1VDnbx8_YVuGrphukjbSA0ZUBZDJp0kZuNO1PJDnt1DFDlGTL4Nw-VswUITLTkdobFLNCyQP0pX0UawIqTC_dYD4IAe4RWxiJ5r4d_XE-VMImsIeFZv3j0zxVLm3xXHTy596IrtblMOrLVvIee-yLyxPXbdamhVjxnreS1ElcrA7P3GsAHi6HASFpCeifjESuUHuQ_U9FBldjKXA4CplZZ7g6UkdLmj2f2tHi0OlI2dqEjZ7XoJ2EbdhP7S9jBn7_HpnGxt9JrN2YjoUyVrouhsssQyqagB_Jl5xxoN0-MnXOcYASBuLkS0wAdgZmB6k1dU0wb00DUc-hlw9NFsV8OsIbUZtBJPIXAtKSKXzh9rH3y80eNDLftztqLi5Fpt0971BihOZnZOuDaw1W8aHuTNty4MyVCI5jjJrUvkVjiYfy-n9xP0krdovMU0ZeNq5RmbK60PcvGfKpP8O98JSksCWAe9qFB5JsBc9PaCvqzHvSShyNZUrqRm3yMomvwDK_7Gvy4to_mx39UsarNq3G-fO4bsaFCsiFFvMDEOW7jluE2DbqDx1dPua3_II1FG0A4aAtmLLRHzomEecj_wMZt_ShVsfRWYKwEq-i7Tak7_NyF9S52-NwMFigdhji8vu6NPBMfEl8A_KYZEKrvaw_uUGytQZEtOB58LVrG-OHc0VXzKwxAF16baeEE5M8-FAWfft84KsYHp_cdqsGx9Wk0RLz_OlWBnUyFhyiVPWezxbxkx9DQwJjLk6i566I=& p=9GN6hU7ZYPOA%3D526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhCxU5ohFpckmhoBhfo2QChtUla9EU3JR7v972VcMQBI068A0e89Hj-VMQSqW1fuI0yBxPrYA6C9hJxXq-5w2UBH7kMYWjM3GwPvLG2gOyHmfqh5Cb3N_W0LEAtTm2i-XhTbsZwOQIs130llyYfdwF_Rh-mAjRF7VkZQ793vR7iHZnNKahg4CyJtl1WzShKl0gOmBEsSHK3Exxr2Xzdiz4zH4JURSCsJtIV8Wf4dV9p0Q8yC7GjnhGLLTkAi2sZWod9ncKeQ8FGzcMNAKT4Zrsi20z-EoKI9Xn8cxD72mmuX8sBEUAiZGS4cXmx8l-FwmiZR1SG-E4rUgr5itThkf4H6wZ8Ggkoy6-Zd0P-qXQsZFc2wUWfEOvWu9p4TL9oLcrgHVCX3VK9wk6GkECUMkd0gzl6oGA9eTBGtbhbl_W0n19FXHlvW3lxF13b8q0eoS7uJFAIbVj9yrkheAQaydd-uL9D4MWRzGslCBtepKDvek3RhZverHj-qUlK5ZXocLKpof0LVyGHpCy3fdKT83is3VYJFQz0BlSOfbnyIt0q6BAmgtvDdm8Odiq_kAWwr0ovKk0nSqvBKul9FI9-8ZK4PJ589haE91qc1_Lh-F-YIiKL0uFbsKrb8q9KpinSzn4lV2OYbMCGcPu_35H7UfYdcpeK_RXzhV9tjEHlw_EbJzRLfjzV-ns9BONSjlLQWZV4j58GcIyeDQZEeX0g1bIkWT-ekZQL_cStmExd8mevb1ol_CCYGSVHS_QmD7Z7kiYi27V1SwS6UWkrsNujkonsDPF56BCD0OGbpH8b57V6CkpisLgeOBnN-kG2O_NXWUw8zZeZVNDSshbz_DPDDkOa3Gq4TcMoiT_LbEIPQo39zIG17HnyVXvz8lq0QFL7A28D6P6IE2788MjEowbpK63UOK4QEIxoZO1jzxs8z3CkMgsLi26FBOaEzynnD0F-1NDsIHTQyFOH8_2kuNjEeKQ3S1bNi4EDQ3ue_BItKHLmbGU2fDaIjsTwVARfo4rhZ8nwD-8P24WJq4M0td8Xkf_JdSUtaDOVCS7jqESb6K05S6U1rB1UkkVPwuGGMtOBC2wI%3D8& p=sAj8L0ZF5qmA=LJAg9DzaHXvs1KBzutYwhQmrsoMuunFyAGD4IBks7HPg6ztVTrKpJtQkfB8jCJlswrXJ1M7Uv81iu8GoNavJp8jKu6jRmMQNYaSSz1iNK_NIsv7GMxPkbwZ_GtQrcCa72rfrI1nPCgYHDl7c19tiJiPg_LQJzj5FzszyoFR_Eon1b7nT3r2Hax0a0uY6YohdDE9k8SfPIWb-sCes9BuO6PPP1QEgXFrQ-XdjvR77nGNgosJ7Xzyv8f6Xe1Slv41044jEcRdZ-NV5PqPkcczgMNk0PciUsD6iGGsZQwrnBa6uvbyi8GtawsP9hYNSAe1H1b0Vol88v6qWJWmCOcffLffDe8gd_chYRC5kp9DtPYQKp4lUixO8OteNd3lfgaXVsxqnrbsNp6wvabRT_F5HnNw948XUW0Sse3IbCFo4_BJAJ9vY1rBYdznJKP7sYKklb3OqLuLVdadu9K2QAJjT7jjnH7uR82-4b2aaB1j-UcmAhmyKJEv7S8PWIFQ9uc0XV32PdHnLYvIn7EL8L0X2J9DQyFXxrT-gGVGu0VkG-QnitWCGdc1xyAwOGgub4R1m4Xo_ohULZopa3gv7Vm7pw9QscVvDvK9D8tWoOkjNdCisSb8PDL9gYk1rygQHRFF9ceI7sOaiJSiyhoBqitI3AH19WlAhCCvUHF0bVSMjesCnUX6EV_o2cpZR7Opl35oowxuzcCQPev6Q0bQK3SUBSFvc5FbGxz8WTFpllQvgIuO6VYtEvu_-2lvwNCyJ8rM9OFUjJfomq8iGtBMoif5lKUPdWUKbASKcQsQQNtl8y9CYgzbOUdkiy8jJ4Kb-nor7BZfZxa0SbodwZtlJ2fH6dqOpxSbWTTANz9eUczAODUa5r8ZC8nRto0v6ZVCiSK2uTBM0hO9AiwGFZjBlCENPnRUuw4bT48iaWp8pF6Sm3jMk1ayP9MaRR5b4Qq0h44jMDGKi7_dTD2I5zk1lSB_ykEcEoHFqetqHbfWwJ3pApR46BSHVsW4fnbsKUWiIC3zTKqCQ_zLYYaqFp_-qAWdh1YMjwTE3fpccY1VJIhA6E1HR8CgWhawEW66waXraRCax-yFyKcGLsFedlHeuczPR5xvYUMNNDOZHEM4UD7SeF-FsRpxBYChdComrSn-9A9CbLTEFydo2PznVxdiRmCygkNiF5XtqSZrXK0kbJcnjpcE=iZ& p=v9XQc_gCBVVg=cMsgU87LiqwX53SHNCknKdEL_kG8_V3kqiqyAcUREjoHG2Lgnw_t9sPnPBZuQV1q1S_5WLiS3fmfRhKCrTF0h0ipZ9PfeFvv1yBzAtWcDkL4s3yaSRKRrZ62w6Y0eOofxgoMJzGPC_O2cQp1I7zK-21Ca9GsFPt01kH78mFHtC9GhqsAhV767_7DU3z9UZQ47anCPBbI0aOavlRWIDiQg33Auhv-DlN93XL1uAkFh4nZC7Z23jAJhEU6XVLgOlrJP76DOuXAKh_gttZp-jvZ_EeratePgAwBlNDKirFXDiK-SL_Gbl8iUDrT9PY2Pdf9wGQdy5nd3SLcQra8VkQabGmqVYXkIOThKbOX7kO2nT4HJ05yfIJ08LeS0vTeC9pZoBUFEg-flzsLyhr_jlNQD0_VihAytcqzcM9B8v_XLpsp4Jn54Yi8Ob90KYD2xWEHnNRFE2_by0z7taSVTxvTL7S5m2TNWpSoHNvEhn0a-h0ncgCg_YhgvEOX3hlNJiD49MRn6KY40hWmcbn_HMGqVPfqS5KSLYhkmXBK8w99j5TClV6stI0EFZ7fuy67LSeBA3YYTkuau_DGfqY58EysRYaWVRO2IujR17kivzmTm1qyeqXviPyLTw-JyQlmfjoCIpPLVckOVBzD6heAgX05wFt5WHcgDtoxfT6Hyarx4MJDMhSRa4NmPklZlxFbtylkgH_1TsVppuAUiFZgRitFLDM06QOCauqE3c-bx033f0_AendVuk9u6zmpKS0bGsrCckOwrkTOqDuSxh3mDux3k-SGtytmNAGgMmoun2-LLF1LR-i4GvgHpa-RDhoGnpy31TA-MVGAWL8TkBg1Trf6u7pIX7LIPt1-41_02A7DCulj9nT5yjOQ9tJKHXr8yPuGp13N8yq4abFlIamceAMVbCWI8V1Ribn9CFkfBujFaJTh8re_mwoIk_b4B_hZt7IwpIgBZC7sxQ9A9ZRxl2h3hctU6TJEMiZnfQj_6Tdanq89TkxtBdcMxUDaLk0GC_ZK8ve2Vx-TTszb96ba_wCe-rLN0SEUM-4H2OgORAYumOjH8NArDouUO0LvMC3nan6wCYccts784-hUqnGN8MbzPevDVb-IrHm5W2hu6vqAtetzTTTlUsAx3OFGeGRLV5plhB3vBXqE0tBDqR1Z52NczUJWvRlpi-DHQ3WbGa-KYOI=vs& p=3FsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASEnh_uLMsVKxIlpG0C5Q4ug603ctLVxzfjsT8qUyUG3iGWq0JoLvG0hgy3tdfUciFamvfTERZ8elU9jQBNiG1nqxXtTW6rjQw3XWGiYiqm2UJTM4WlQWWyRK6HwmvHvYg4JCNA8yDD8NjjwZ5vGrTx0YC87qFtgBBFTA1AsKHIXWrHcCl-URu3T6c7mnDtaEL1OK6uL64066wZtQp_p08YgnN3ItEg1Kwy20qlpUOlmxQ1n34ZEC3bFrkaYDwKF92Mbr-mxbQaKd10cWNrfXD64xQBQZLGBd1Z3ySpEC_bhB9GxgQw73e32Ptk-BMy1VAq2I_v0nAqklioc3mfmnGqSQtpBJyJeRqBZE0_rjjRuWq7WTrC5C921MQo1cUEs6rUcsEyOJuJKgw0L3dU4WjpD5IksQ_bcIGKEIBu5MY_-zW6jFvHrOxwPo3BsW3N64pS1bHWzaCZ7W3z6Cs5KynVODTgTDB3ApR2OGE8OqO19HturMDsj0TnxOs904MgFnQ5k7GnqW675EMBkI6EKdC8ARVYNQlzJXy0wQxzfUAiFnIjDcuRbFAVuAEWeYkN0l0dEMAS2MwaxUo44WGjnvLEsbP5TNPuwV7K09JF4RDtf3w0OvolLDtuzP8es4yzw-AbNPV3mG2T7tqzfVV56pEqgKBu3-zVKTRIm3hZzBLwJkTJlui3a8yKz8x3jZsSQzyKCFC2QOGkCkoy_Xir_Yw2irwJn_nbHJ8J7cqNXimK_y9O3KNjUYi6bP1bPaaOxOJqgndDFEL_zQmmEf34KXhNjcZqZ7BUCz2nsqsslBvtKnmzL21ZWm2MT3DitqsxvolNAlzL1mtUfFB6DwMdNCkzS9qhqDyvz20dgtHhZfeT2oo9ekMUQ1_bFDTSvqL821bwLXCA3XOnCSLE7ms2tgJRRpAaWJ5zJEylb9pC5121qQ4fFSAXbffECU9r_rOPwfi6e1QV9iFeaFGc876HWTRisSW4by7PSTG27h1tQGMrdTLpYMpmOJslEzJVVIe9Gb9zcAOnFC6AUYzeCn0wD9p20kICWdkqTuslHnvWwdM0p_fbCPrXQEgSeTQBEeAakHxM=A& p=VpnoxxlgBSPY=t5Og0slBpHHzPPMknxqk74APSGPwyjnRBnOKZHydmqgtd4NydkuFjFEmkT6LZ02hEmqwtaXwTnxHvVls6miETrU9xDZQPMnCCamnT2Y_sNXdciVNT4Lxaq5lZ1vZiYrZBCWVMX7BKSKoQV9vFGJlMxr8l3FjfCi8z33w6Kb8p4TAvH9muXpU6RzIDGlVknrbJyblm9YRmMBPb11uj_itgVQTKrpSfnw8DOnNQPmwp1N-JNM6ttgVGejRLQzO-ikNuggMbN9toU12gT5Qhdm84vjfDO22HBxJAhlOIEq4LE7pLo-4YXgg9yfMUXgdQZs0zSsv9MuAaPpCIWRAgOM7ioMhD_h644PklsRBPZ1N2HR1EAsW6_C8-z_B7iZZ_ZJX7h7AeCR4eh51VjxJYwk8Njw0rpbmYe7r99K2aOhFRlLtkOofkIqP2qNoDTrpHXIpNnnBVrTZmhlIup2FB4EdHmcT0gCzP3tCY_SAYl72JMumcKxzmmNU0GW5p3m5SwnNCUqMeoFOyLQ7EM-Xs0O-gSbyKryj8LbA0iSk4ANnHm24N-6eg9LcLmL33do8dn2Y_iPPk-K9q2UL04trCmskt9C-NE7ZiQK215Rs-OhfaDYwMfGcydT1GsZqG0wzlyNu9mEs-bpceULdm6E2yuV_QrxYepTaV4C5UzRH3t_IC3nvleAYL7tRCFjczUe_Es9BfOw-SATYS2peANXFs9nV2i7xpW6a-73ho_TMbz0sj2_wDCCs95NpH13yS5IgW0oNMK5J5F7yrhyLJ48K2Or-KH0VoWMmElZEcAyOQkwVU_JnmY_Anh7OMkPETArkDVwiPbmIaUEDCPImEVEsLQIWvnWQEyKV9-4EFGddyKevxH4Si_fv9j7k8_xJZ0WTIUuPZ0m7fCjakwHRrtleR6QA8wFDYqkYK3FKRpxjtA3jZNfPTV7R16AQT17VxZQeXPnFoM_WZo95yRXZiUoRTpdWnvCUJPc6KKhrGujlyiXTu3YkOel0GcnmDTe7keeE4n6NjOeXZ6mlLliqEpO0ENw9cpD89CmdEqAsz36I214JfZvfEEoEmf24DUZ1OAbb-AXqUhCAJEZevQxaG5IsNykF9rNLE_KFB0IbZfLI9_RqnlaTxoP_4WdEGbXuVQRtAunM7ILi3Pb1TNCpZ3SIuY0Eep-FALeqdjX3ZzDyFEdgA2Y=& p=P9sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknh2jjMxW90LfgSXnzj4dwkhSfXN5HlrLJ7uZjFY6eiwETyfc7y2OJaneOvOFHNF0cc7jfTFE4Xj1pxU_miVCd-LLu8rhKTOUNcgvi7kIoCsfkMua83VAPhzETJdIhJkXmRDbw7jscwC5XdVkwLQiuaR6VBoyhE0BkmGx6WMcO1R0wIi021Px-nVOO1ClYKAYfOcePlybUaTaubdFORv16skPUigcovL0--cX8iAtWDZV9tAz3QO7nYaWLLvkpdXY_9MGxzKYb-8FN3pelH1Ra8KnJVCgexM7TWg6QW9VScPfyWtUwj0MLONpOOBTW-g20wYQme3E3MopLftGDEWcmJJRkEdhpOR8rLfntZ2CknDm-HheDDVDPRIVUQNL5xcceiSzBi8mi1PZyH-aUydCMqqGKtMa6UOls5QdeKTTMrGF4EWnbl4NhNOPRrnZsi275V7eTDbjOkqsJa7lvowrdE4lyzls9TSTmuE82lGdxTxw_foDWv1KWYLXyUkRaUEF2mZM60caPlWUw5ccr1d_GqlX8XiMFNsEKPXTt8wfvP4-D2U_CVSG0gGEUgYrM6L0DIrpmTc-5lkdnCl_mXh9L1zwzCx6n2Cy5qCrZdGzcCODsmnZUEJgQQmjCi0P8ZZLTCNc7HGwP7MN2oZn7sYajOlKKwBzMMHA3xgK9-DY0LWztAUeEIIreWp5tRLSp29AxJOMgZ_J-6l6tnr4iSf2ZjZ9-hpbdDrDJ1ZsaPUjj6aYKr5CvO1RbGXnZe36iuwrQaBDBgEW8jP8OkWqRua8Fxjxwhco6vSh3M_bVYn-a6zHApprd-heQ2FMq3JHZ7N_AyKmdeAcItsrnKsbk8vI7vCNvLiAYTe_n5Z8sUb6Ws4gO2sO3omghxFSDmPNLawt5qOxSnk1Hvr_Ju8v2g02DzMgn92HRDRVSmJoaswpXSxPAFLgpecdDdlrvUoUjWKyHB1znEDUmzra9z1Y3CFXVCwuveUSTqcTQeoeIC0LhcGg5oLO3VM2iwhN1qGPCs0Tj8KwIVTus_RqDKxLDx0qRreHsbS3aZMmlMkI8QNT43lN0MsfcI5Kh_6mg-GcAn3VnA=& p=WGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhCxU5ohFpckmhoBhfo2QChtUla9EU3JR7v972VcMQBI068A0e89Hj-VMQSqW1fuI0yBxPrYA6C9hJxXq-5w2UBH7kMYWjM3GwPvLG2gOyHmfqh5Cb3N_W0LEAtTm2i-XhTbsZwOQIs130llyYfdwF_Rh-mAjRF7VkZQ793vR7iHZnNKahg4CyJtl1WzShKl0gOmBEsSHK3Exxr2Xzdiz4zH4JURSCsJtIV8Wf4dV9p0Q8yC7GjnhGLLTkAi2sZWod9ncKeQ8FGzcMNAKT4Zrsi20z-EoKI9Xn8cxD72mmuX8sBEUAiZGS4cXmx8l-FwmiZR1SG-E4rUgr5itThkf4H6wZ8Ggkoy6-Zd0P-qXQsZFc2wUWfEOvWu9p4TL9oLcrgHVCX3VK9wk6GkECUMkd0gzl6oGA9eTBEvSCw5UpmOVrB7FIibmG_pf64YFC2KpXQrjxIHmhlLD0cA_s83dqm494KVnQb8kmM77a89kajtAaWvyGJWpI4GMdeQjkAOC8wxoGny61uTCZ2mYDUwPh9MfVzAp1DD4ewX_l8GdWqbPrgYfaoFLyFYhcFyFgpeTbSXnPyqZ9f9XfMGNk-AUM7FGGTUl2W6m8nzs8zxh2HtpKdm1OtlfmgHYTJrZUeS40e8SAMcslaSnkRpBCOTNXbbfQ9H61yfPQiijvB1esrrqkMMHWqKPIpU5XQqh8K8CGa4ZXhBuCDAzXJbVQa0kOY4k2PoNmn8yZg2I5pGlECiUP7d_Me--ctUFGHzf0ZXbsX_LtxiJGw_OSZmgu80Od7Jk9v6FTnoN-Ja-CQP1sW2l-VYu29s-frkkViZrRPCngmsU25FtloRjC7ORxserOUE0Td9mVfNsdx_J7zDJAoc_HpnayK9MOXxu55H6fS55ImtRUOo08dBvPCkBcqoNJsjiAPgFqPCS0z7oOnIZNJSlYe-vgMm8KiIknWUpXSVd6HJPi3fDFKnWxohg3nJDfY9CQAI36bpyKmEk-en9xt_EWUKGSi1Ob9QfhCeIuIceokn8fhjkYv75-dPC4OTs7UexjtzVp5K_MDnVyCefP18k3xLTUlY2DmMbmZYKmSADsE=a& p=b9XQc_gCBVVg=cMsgU87LiqwX53SHNCknKdEL_kG8_V3kqiqyAcUREjoHG2Lgnw_t9sPnPBZuQV1q1S_5WLiS3fmfRhKCrTF0h0ipZ9PfeFvv1yBzAtWcDkL4s3yaSRKRrZ62w6Y0eOofxgoMJzGPC_O2cQp1I7zK-21Ca9GsFPt01kH78mFHtC9GhqsAhV767_7DU3z9UZQ47anCPBbI0aOavlRWIDiQg33Auhv-DlN93XL1uAkFh4nZC7Z23jAJhEU6XVLgOlrJP76DOuXAKh_gttZp-jvZ_EeratePgAwBlNDKirFXDiK-SL_Gbl8iUDrT9PY2Pdf9wGQdy5nd3SLcQra8VkQabGmqVYXkIOThKbOX7kO2nT4HJ05yfIJ08LeS0vTeC9pZoBUFEg-flzsLyhr_jlNQD0_VihAytcqzcM9B8v_XLpsp4Jn54Yi8Ob90KYD2xWEHnNRFE2_by0z7taSVTxvTL7S5m2TNWpSoHNvEhn0a-h0ncgCg_YhgvEOX3hlNJiD49MRn6KY40hVtBXDDSLDF8MS6Oi8MCd4i1vrrzjJP2bGkfOSp1ip7bHM7xckYxslzw5sSJzz6mCmgnOJnVbL6UWtSeYejD5gIh418kjK0g3O6X-VSdE8en_bldFEv4UrAKV_aHXEzh8_Iq2LLHEAw-rmwVb1UhZ2gAGCoeVMHFdjbwzabaz4BkIX0xlAgXWrEY30bx2oHMTBfNwhGzrBOiEALncAVOY2zW5leY8oStIDyS-SVXIJP-37Lox54VFvGNL4grHBZrOwUFWwwRTLwATTYCTZ7_MTBOcZRCJ6MQeubCTnhnWuxY6xmyoKKZtgSjLb3nG98WLkXDz32zc5kUDB_7tItF_Nv1za1gB-EeWMvCe8_iuztWXCOWledHmdRDRgt2emsZWrBbU14WsMAbyG0iF_2h8LINUNr6V7mtTuy9FleX-PPo7JWoN6BQCwBE9hMkG69ePt4WHj4F5UQGZQSji9iorFkgaZqnK90N_hAKysiSUQaDzeORjuboUcoFLL5O9EWb2620Ln5C4CMS3ou2QrNfxKZdgLdwpKGch_9vGvkX6ohV8ZEWkORwvsY_-EtrUaRDS0yHIw0uKM5wTGzUKo9qHGni-WPx0NXx_zbrv93u0rudZdOx88ym0bZoCgsByOyAnUPm_QTay0sfd4zparWtNGBwmZ2gWbqRkc=fe& p=QFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASEnh_uLMsVKxIlpG0C5Q4ug603ctLVxzfjsT8qUyUG3iGWq0JoLvG0hgy3tdfUciFamvfTERZ8elU9jQBNiG1nqxXtTW6rjQw3XWGiYiqm2UJTM4WlQWWyRK6HwmvHvYg4JCNA8yDD8NjjwZ5vGrTx0YC87qFtgBBFTA1AsKHIXWrHcCl-URu3T6c7mnDtaEL1OK6uL64066wZtQp_p08YgnN3ItEg1Kwy20qlpUOlmxQ1n34ZEC3bFrkaYDwKF92Mbr-mxbQaKd10cWNrfXD64xQBQZLGBd1Z3ySpEC_bhB9GxgQw73e32Ptk-BMy1VAq2I_v0nAqklioc3mfmnGqSQtpBJyJeRqBZE0_rjjRuWq7WTrC5C921MQo1cUEs6rUcsEyOJuJKgw0L3dU4WjpD5IksQ_bcIGK7BEuNXGkvQoC0ckpbZ4TvLLkXsn612QXS1I9p3QcbLElr8Yxzc_It8H7m3TuliB0WRFufSEH0jGaCtDa43g7DOE49RFIb-0IYsSheyGtQf1TfuV0bCwhNvKviWvVWxXlyNOFHN0SOvwbfbNDI2WV8WuxPjJ6Jp0KoIMQczof41qm7-fJCCRHbr48Wwki2r0SVIJjdkiQ7ZIPX8zHkXrj0EE3xcjXvnKV5SVk89zmwQ8SwcpguprG2_ZpsTAoPeP_aV5R6A4XfJj9ZYdghucWYq4M6ImkPs1b60iyulL_3ySktFStKE-ptXnx7HwFSWzqQGn1SrHT72UIdVEGmW6MUk8RVNCTiOmPtzRCQV7JQCxHyeVdh8HXtV4Uq7UQruojAO21NJyQXx1Pcqis_oRaRrOPXUXLDfLOx5cAWE_PSNcMyqFb2UwZYFto0BtRtHWqDjpjBt0884pfvdp6O-piU6eIfHqmD4TO4UgMaXNMdkXzdoHG80K3Q-rgqBwfqHw9iEYcG5BQXt8z_abC52-1KiPEm9FllMnuSMcG_yNhICjpEHcLrJ6ufHLT28Pq27uNJljpNkTM6E93kv0_bvR-Mum20fjGL4sIKHKJ9tJvD7W87GI5DSdADEwXLH0Nw0pl8LhyyWEKdUVXFYITlMQIXGyVLFvdgouo=3& p=MGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhCxU5ohFpckmhoBhfo2QChtUla9EU3JR7v972VcMQBI068A0e89Hj-VMQSqW1fuI0yBxPrYA6C9hJxXq-5w2UBH7kMYWjM3GwPvLG2gOyHmfqh5Cb3N_W0LEAtTm2i-XhTbsZwOQIs130llyYfdwF_Rh-mAjRF7VkZQ793vR7iHZnNKahg4CyJtl1WzShKl0gOmBEsSHK3Exxr2Xzdiz4zH4JURSCsJtIV8Wf4dV9p0Q8yC7GjnhGLLTkAi2sZWod9ncKeQ8FGzcMNAKT4Zrsi20z-EoKI9Xn8cxD72mmuX8sBEUAiZGS4cXmx8l-FwmiZR1SG-E4rUgr5itThkf4H6wZ8Ggkoy6-Zd0P-qXQsZFc2wUWfEOvWu9p4TL9oLcrgHVCX3VK9wk6GkECUMkd0gzl6oGA9eTBG8Ytl_L3AqCqqPzdaVO8Jh5S_NlR5j-rQcJR-wcuStMrZZT4sN4xgSC7t4vN2gpudIs6NsKzro7NParToae_li35Yx6efthSVdlIipfkwA9aObPTRXjHUOCAy4YbfTGLmVWB5eEdMXo5T1o-avxbaJ2gWjcApFaZCK675zTlumCeKoH1zbTN17Mj6rxb9mGQ2KrBSm00n0CELzKEIRz9kwtGpkynojbde1h2mgdmaT4DPJdK4GZZCX0fsuvOxDZDHOA0FA2xERSzNtu31gV2GnhnyeVTK_JAJGvrhzYc29j3VTbE0qRAnkvbH7MzlK-U0Iinl6K2UMp2RjsU0ZT7oUfmX6SFEsidppH3-H8wYpRiGALvanXu207VGLIPBeI0z1_QtADzq-1rVBrWwE4IJdIUz5Yj5Xadr5j5dF71A7pDrBBH2GF2dxOPHBZAD6aaLBNhk6J31tjO5Osl4_YhRB0fV4dyQ8Da3BxPV_qSBtcPpRf0u07tN1pg2PkFdSLjXDufAUFtsvM3p-JJDUF7oCFtRSnyzYwxFnpH69MvxPHbB0PcujP_VmdvczTR65RkqFDu9B7dryVQijuIMEiioSM-WdBOaGMaZq84PEDVjonlAHr54XITpm6Stu8adZ4HNl4u-ycjT0A5jkIvguXHnpewxhGHrGYTY=4& p=STptMzLWs9eU=uciQbPpLErmtPT7VrZKgcZLS5bhJ3yikyEKCmE-YD43hikhgmKiAgErLMXclZWUEoBjjZLKA8KKcg1yGwCQUxmwQiVqu6uE57dZs97MLjK23BT4vAXPCAOf2TQeYKATEQ9JgXeua_Ee6mIdCmfSYAlhZF3iZKAI4uh1tsD08GTboaR4wr__5HjbVqe2q_T0iSeCj-I0H4gSqjXdlt_cp-KtVjbOThDNf_IZ9UsVCKKwWSwnD20hKOBtGdZlIpeQr1wHMIrL3rbPMAgr27Q3Un-hEAFmpXqweHIusjX1Ldm9n5_Z9jIQJmAI-_OsqliWvl0P-nBvnhuXLZx-y6FTfIUQgWPL4mFkw2gIOPb-wuRdQWCyWCqhXc9cNMBI9KtOTEnsAaZ43V5cHGXXA78zHZ9t_0D9Ya6z0pClCt0waXg2sEjyEK0di3QA1DqU_Z4V1mRS9wbBNYkQ11zj9cTCFHnefuibzPcgJEnIs8CNCuNhevRWCyaAuW9Yf06PFo4vXH08b9Rqj91AmfQm7xu2zBOJY2BMxgaoV5J6bN-fv4bkIXdMjUUrjRogUOgTRA6bd_yumtkaJ0cz0N2jQPTEACLf6CZsEAlewwJ6FIRfziKjUAz5WTWyBCqY4ldTFLFYAi2GnhrYM0vikXQjM9Vm28c1e6-1R_ds_TJsFGcC_QU55mjip_HkFQiVPCxcC_6L0HbenkoIvKKtGywiHj_20aCX3x1DJV-dSlQi2_n6v7D61-1q-wtlKfJKZ5FcWRDG7ahayYSDRiItwN15GlyDu_UOWWQNDzCCWCuQDIgoli4Dr5sTxQESEXkhmJkAqLjAULgUcSqCFaMJWb5_frJcs2-Hylm9O5C_-iOOu23P24jLh8_VPFCwxVx3DUDNPEEvNfDRO2_ls3Dr9X-UjUtQYSTZse4qDVp_oCwX7Ofno77_9vREJ-zfNw0POkSGBdBd2NHfktCyNTVyx6wY0hQnOG3nMfH04qQo9CUo92oFrRQbB6tNm932RL7f5ojPjVCvxpoPJRvn6CKpvzaIBoOElMTx2nB6N1PAfsr6QD9MQxpl9CK-mBbjNehK6X-s9muIG76LzdGHWtlFvbd8Rg_NRVbF7BDdRfTvxFI4re9HbeN-4j9_WZToTH7VSHB4p1S9dtoR20XzRwXVq5zRg4mdoFfIBvIsdRzN7012MsEMYxYY=& p=1bnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCIh3DtkFTwNb1dEq_fVgPyQrGHCI9WPCn1DVLrCaHYkoL2U62BQ_UAIsE1TBmDt6pwOlUwljhJ_mgsmiekVrpbkj7o90fk39JmUQyKuC2TR1m81jRfklLXaXABX7ycUV2lk58YYGxT7cfloJyyCZndek1HKefv9sPy5lYhFxXZkJKiCAYo5tXNnD_pbSFj9xtpEV_nTmF3azGLVfSuNmzn5dUmOXhqUBiyjFnhsaT153Q58Sy4XJdrqkkVXnZGLLLSrAtRc5mv1eXAVxBThXnzFaQAuKDtcabZ8aLjo17ds3U04R5noOrdLUAkiBuEWbgLTyl1VDnbx8_YVuGrphukjbSA0ZUBZDJp0kZuNO1PJDnt1DFDlGTL4Nw-VswUITLTkdobFLNCyQP0pX0UawIqTC_dYD4IAe4SmVmBp2EU5tVYkfTkYLHtJVkADxWWjghJSsjjp-jghSjS2vMpLJ7Ickx6BVKnVN-jnrhIEXHITdb4yDhvN7ImPPMVpfjAzHFCyvohC74om00OmYOWQL-yHnGQH5YOWq8IyBSGA_EF1geyUYQaBWSQyW273cQGxirjp0MDir2TOOsIkAr5LXx8ckNDmjkxE5plC-8kWVwAgfrXpIT9UooPOYCMtkAKN-Zmvev1cxd8o6D9UX6wBLtbp8-nYc8KtmsWMnb-p1pT9tW-RyRLk0A-5mCil8Hu7v98T8ezdgWy89NW8b5F_lSC_8SQWHK5zVHPxjNvIu2q0XB7P-8m8KjwlVy27JtnzJjnlAPmQjq5sSM8EJZP6JVuUKrM5Z-3ZZl8LWE8RndF5cQKH-bP1QCIDvsY3B2UOLWD2gH7_i0zWbI3F15sYyHjJYcAD35Q5-TkT856s0hUZb42NiGqePPh90wVgUuhCfNSbQ200y4YlbpfxbgEY7riXXr4gwv9XsN8MfW6qh3yKklhV4sD6U771N1bA-lDU9FK-d6rpF7TFs3YNq7r7Sez3_rhj_edsAaya-2X0VWlATaOxHydCB-Q8Syy1Fh02GNFM_rUKCmTymHy71E97y1kT7JNvfhe7vHJwu0ouVd-uOPeudPrApmsoBGpwAJMWJN8='


let bannerIdList = []
//let duplicatedCount = 0
let finishCount = 0
let rewardAmount = 0


///////////////////////////////////////////////////////////////////

!(async () => {

    if(typeof $request !== "undefined")
    {
        $.msg(jsname+': 此脚本不做重写，请检查重写设置')
    }
    else
    {
        if(!(await checkEnv())) {
            return
        }
        
        for(let i=0; i<jctqLookStartbodyArr.length; i++) {
            let lookStartBody = jctqLookStartbodyArr[i]
            await adlickstart(lookStartBody,i)
            await $.wait(200)
        }
        
        for(let i=0; i<jctqCookieArr.length; i++) {
            console.log(`========== 查询第${i+1}个账户看看赚宝箱领取状态 ==========`)
            userCookie = jctqCookieArr[i]
            await getBoxRewardConf()
        }
        
        await getStatus()
        await showmsg()
    }
  

})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

//通知
async function showmsg() {
    
    notifyBody = jsname + "运行通知\n\n" + notifyStr
    
    if (notifyFlag != 1) {
        console.log(notifyBody);
    }

    if (notifyFlag == 1) {
        $.msg(notifyBody);
        //if ($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}

async function checkEnv() {
    
    if(!jctqLookStartbody) {
        console.log(`未获取到看看赚body`)
        return false
    }
    
    if(jctqLookStartbody.indexOf('&') > -1) {
        jctqLookStartbodyArr = jctqLookStartbody.split('&')
    } else {
        jctqLookStartbodyArr.push(jctqLookStartbody)
    }
    
    let numBody = jctqLookStartbodyArr.length
    console.log(`找到${numBody}个看看赚body`)
    
    if(jctqCookie) {
        if(jctqCookie.indexOf('@') > -1) {
            let jctqCookies = jctqCookie.split('@')
            for(let i=0; i<jctqCookies.length; i++) {
                jctqCookieArr.push(replaceCookie(jctqCookies[i]))
            }
        } else {
            
            jctqCookieArr.push(replaceCookie(jctqCookie))
        }
    }
    
    return true
}

function replaceCookie(jctqCookieItem) {
    if(jctqCookieItem.indexOf('cookie=') == -1 && jctqCookieItem.indexOf('zqkey=') > -1) {
        jctqCookieItem = jctqCookieItem.replace(/zqkey=/, "cookie=")
    }
    if(jctqCookieItem.indexOf('cookie_id=') == -1 && jctqCookieItem.indexOf('zqkey_id=') > -1) {
        jctqCookieItem = jctqCookieItem.replace(/zqkey_id=/, "cookie_id=")
    }
    if(jctqCookieItem.indexOf('app_version=') == -1) {
        jctqCookieItem = 'app_version=8.3.7&' + jctqCookieItem
    }
    return jctqCookieItem
}

///////////////////////////////////////////////////////////////////

//看看赚任务
async function adlickstart(lookStartBody,idx) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/nameless/adlickstart.json'
    let urlObject = populatePostUrl(url,lookStartBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        let bannerId = result.items.banner_id
        //if(await checkDuplicated(lookStartBody,bannerId)) {
            if(result.items.comtele_state == 1) {
                console.log(`第${idx+1}个看看赚[id:${bannerId}]已完成`)
            } else {
                let readNum = result.items.see_num - result.items.read_num
                if(readNum == 0) readNum++
                console.log(`开始做第${idx+1}个看看赚[id:${bannerId}]任务，还需要阅读${readNum}次，开始阅读...`)
                for(let i=0; i<readNum; i++) {
                    let waitTime = Math.floor(Math.random()*1000)+7000
                    await $.wait(waitTime);
                    await readLookStartArt(lookStartBody,i)
                }
                await $.wait(1000)
                await adlickend(lookStartBody,idx)
            }
        //} else {
        //    console.log(`第${idx+1}次看看赚任务[id:${bannerId}]重复`)
        //}
    } else {
        console.log(`激活第${idx+1}个看看赚失败：${result.message}`)
    }
}

//阅读看看赚文章
async function readLookStartArt(lookStartBody,idx) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/nameless/bannerstatus.json'
    let urlObject = populatePostUrl(url,lookStartBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        console.log(`----阅读第${idx+1}次完成`)
    } else {
        console.log(`----阅读看看赚文章第${idx+1}次失败：${result.message}`)
    }
}

//看看赚任务完成
async function adlickend(lookStartBody,idx) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/nameless/adlickend.json'
    let urlObject = populatePostUrl(url,lookStartBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        finishCount++
        rewardAmount += parseInt(result.items.score)
        console.log(`完成第${idx+1}次看看赚[id:${result.items.banner_id}]任务，获得${result.items.score}金币`)
    } else {
        console.log(`完成第${idx+1}次看看赚任务失败：${result.message}`)
    }
}

//看看赚宝箱状态
async function getBoxRewardConf() {
    let caller = printCaller()
    let reqCk = 'device_type=android&' + userCookie
    let url = 'http://tq.xunsl.com/WebApi/Nameless/getBoxRewardConf?' + reqCk
    let urlObject = populateGetUrl(url)
    urlObject.headers.Referer = 'http://tq.xunsl.com/h5/20190527watchMoney/?' + reqCk
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        if(result.data && result.data.list && Array.isArray(result.data.list)) {
            for(let i=0; i<result.data.list.length; i++) {
                let boxItem = result.data.list[i]
                if(boxItem.status == 1) {
                    await $.wait(Math.floor(Math.random()*2000)+32000)
                    await getBoxReward(boxItem.id)
                }
            }
        }
    } else {
        console.log(`获取看看赚宝箱状态失败：${result.message}`)
    }
}

//看看赚宝箱领取
async function getBoxReward(id) {
    let caller = printCaller()
    let reqCk = 'device_type=android&' + userCookie
    let url = `http://tq.xunsl.com/WebApi/Nameless/getBoxReward?id=${id}&${reqCk}`
    let urlObject = populateGetUrl(url)
    urlObject.headers.Referer = 'http://tq.xunsl.com/h5/20190527watchMoney/?' + reqCk
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        rewardAmount += parseInt(result.data)
        console.log(`打开第${id+1}个看看赚宝箱获得：${result.data}金币`)
    } else {
        console.log(`领取看看赚宝箱失败：${result.message}`)
    }
}

//看看赚去重
/*
async function checkDuplicated(lookStartBody,bannerId) {
    for(let i=0; i<bannerIdList.length; i++) {
        if(bannerId == bannerIdList[i]) {
            duplicatedCount++
            await removeBody(lookStartBody)
            return false
            break;
        }
    }
    bannerIdList.push(bannerId)
    return true
}

//删除看看赚body
async function removeBody(lookStartBody) {
    newBody = $.getdata('jctqLookStartbody').replace(lookStartBody,"");
    newBody = newBody.replace("&&","&");
    $.setdata(newBody,'jctqLookStartbody');
}
*/

//统计运行情况
async function getStatus() {
    notifyStr += `本次运行情况：\n`
    notifyStr += `共完成了${finishCount}个看看赚任务，获得${rewardAmount}金币\n`
}

////////////////////////////////////////////////////////////////////
function populatePostUrl(url,reqBody){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-model' : 'VOG-AL10',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
        },
        body: reqBody
    }
    return urlObject;
}

function populateGetUrl(url){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-model' : 'VOG-AL10',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
        }
    }
    return urlObject;
}

async function httpPost(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data,caller);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function httpGet(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data,caller)) {
                        httpResult = JSON.parse(data);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data,caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller(){
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

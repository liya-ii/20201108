const jsname = '晶彩天气日常'
const $ = Env(jsname)
const notifyFlag = 1; //0为关闭通知，1为打开通知,默认为1
const logDebug = 0

const notify = $.isNode() ? require('./sendNotify') : '';
let notifyStr = ''

let rndtime = "" //毫秒
let httpResult //global buffer

let userCookie = ''

let jctqCookie = 'access=4G&app-version=8.3.8.1&app_name=jckd_app&app_version=8.3.8.1&carrier=%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1&channel=c1005&device_brand=SMARTISAN&device_id=51426980&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202111161441&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1637564766&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=GFsSOfXcbejQ%3DzsLToxWkbStrMy-l4aAFoKU_B0MeXK7mH&s_im=8pnoxxlgBSPY%3DftJU16u0felTt5IexLbZSA%3D%3D&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&uid=55242014&version_code=838&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdl2qFooaZr6m6apqGcXY&zqkey_id=67a2b7bd2cca47bfdd05405d10af9fe6&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFwcC12ZXJzaW9uIjoiOC4zLjguMSIsImFwcF9uYW1lIjoiamNrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjguMy44LjEiLCJjYXJyaWVyIjoiJUU0JUI4JUFEJUU1JTlCJUJEJUU3JTk0JUI1JUU0JUJGJUExIiwiY2hhbm5lbCI6ImMxMDA1IiwiZGV2aWNlX2JyYW5kIjoiU01BUlRJU0FOIiwiZGV2aWNlX2lkIjoiNTE0MjY5ODAiLCJkZXZpY2VfbW9kZWwiOiJTTTkxOSIsImRldmljZV9wbGF0Zm9ybSI6ImFuZHJvaWQiLCJkZXZpY2VfdHlwZSI6ImFuZHJvaWQiLCJkcGkiOiI1NjAiLCJpbm5lcl92ZXJzaW9uIjoiMjAyMTExMTYxNDQxIiwibGFuZ3VhZ2UiOiJ6aC1DTiIsIm1lbW9yeSI6IjUiLCJtaSI6IjAiLCJtb2JpbGVfdHlwZSI6IjEiLCJuZXRfdHlwZSI6IjIiLCJuZXR3b3JrX3R5cGUiOiI0RyIsIm9wZW51ZGlkIjoiNmY5YzIxODAyZTllN2Q2OSIsIm9zX2FwaSI6IjIzIiwib3NfdmVyc2lvbiI6Ik1YQjQ4VCtyZWxlYXNlLWtleXMiLCJyZXF1ZXN0X3RpbWUiOiIxNjM3NTY0NzY2IiwicmVzb2x1dGlvbiI6IjE0NDB4MjU2MCIsInJvbV92ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInNfYWQiOiJHRnNTT2ZYY2JlalElM0R6c0xUb3hXa2JTdHJNeS1sNGFBRm9LVV9CME1lWEs3bUgiLCJzX2ltIjoiOHBub3h4bGdCU1BZJTNEZnRKVTE2dTBmZWxUdDVJZXhMYlpTQSUzRCUzRCIsInNpbSI6IjEiLCJzbV9kZXZpY2VfaWQiOiIyMDIxMDkyOTE2MDUyNzdjZDJlMzVjNzkxMWJjYmIzZjMwYTBmZWNjMjhhMTJiMDFiMjBiODMxYTIxOTc0NCIsInN0b3JhZ2UiOiI1Mi42MiIsInN1YnYiOiIxLjIuMiIsInVpZCI6IjU1MjQyMDE0IiwidmVyc2lvbl9jb2RlIjoiODM4IiwienFrZXkiOiJNREF3TURBd01EQXdNSkNNcE4tdzA5V3RnNS1CYjM2ZWg2Q1BxSHVhbEllamw2LUZyV0t3elhXeGhYeXA0TERQeUdsOW9ucWtqM1pxWUphOFk4OThuYWpXc0p1cFpMRGRsMnFGb29hWnI2bTZhcHFHY1hZIiwienFrZXlfaWQiOiI2N2EyYjdiZDJjY2E0N2JmZGQwNTQwNWQxMGFmOWZlNiJ9.cSD8O3FX7XlGWPidJpV-JvF_2ttO5yqFCAgO4k-QM9X-g2HNqTLKH2XXqWJfB8q7Fa-_VghAidoGUhe-7wS31A'
let jctqBubbleBody = 'p=wbnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCIh3DtkFTwNb1dEq_fVgPyQrGHCI9WPCn1DVLrCaHYkoL2U62BQ_UAIsE1TBmDt6pwOlUwljhJ_mgsmiekVrpbkj7o90fk39JmUQyKuC2TR1m81jRfklLXaXABX7ycUV2lk58YYGxT7cfloJyyCZndek1HKefv9sPyAoFd42eAIPpYkMqKSi9ZWVskNKBjyOzTcXC8dJMM7yMvXuTWCadpecvlLgtIp6rJ_ZB5-3dJdEOuTv3x12w5_5FrqVnTNg6UCXjGcLaR5rBZiWCUs04Q2J7DGQxoAkVCZeLNdm0Noqzq3sv8qGni0Tk5EaVRz3TN3MP7EqpkJLaDeeQwcecM1crI700lKO1CViS3oTKzqPp6VEHezhmQ1WvLOVzFHoFN9FLt_e8k6nBoPYiV9xowR2F72QKdJCtCgcmwDP4oFAundxt0hXKCTuZF88oedfJNIP_uohqCZ5iIQOJ1_lpjlkPWVWn2SZeiMHW1dJwnc6Q5qk9wMk9jqsVJD6GjCP2zMx14bUCTX1DyKglKg8h8rWTDavkpB6b3zL0t4Uixoqann7RwPxdGC_XcNShlaj2FaAgcPQ85C7-vCA7NCXw762NfWUDxiAH-3c7sEzvoPuDf2P691f5YDAFmW4JaouAXUlNRnMnWtWJMcFh12-Z8gE1hH1lc3ACjhPc3oyrLuaQRzQqX6CTceMQHmtVKdRc4VE96Wvrx3DihxRFt0eK4q8_9KHV73EhMQQuVbj5W-vKSsEqPi1UQMr2i189rkkOuIa3p0mtJaSlrOmy3VeAozsqgx4cBcvRQG4EvtNjlDGA8zrEnSPEea4QBIHj4NKAvqR6af-TuPUVEYfhFXbqaqvUufi4w4y8Bli1viH8EST5uqRwJyU2tNMlev0SeKQvnG871-tEGWHdGy2nqA6A1XEthTunlqCtP_ldAZa3kQ8jS7efhYRI3ID6CL_oZU4LGewkBQimY9VrlJvuZxAqDqFOjVnXcOomXsbfivHOx1rPEgvG4Zqvdn-OVluBvpJlp3ixxiizX7UwbBV02qonfZUcD9Lcdn3TYyqOWO0wDOUxxiWA0vX-gw-RFU-8enZB8=&p=pOPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNXQlP-aNxWb9fFUK9m1BPJIoCJVhw-l_juBle7macYeoUS4luAeU5lO2qOlPfSLGJ_wyi91cAXk9l5VXG-_nz2ljIdhw0eg4IfEH_k3mleptndUqgEDcnLy_zw5ip3xFbPvCDFiBI_OWXACl-8V5NzOGhpfInlRk6dE0-52j1G6fm_cUq-dp2JISqBv7hTVbYYd0IBK5I4Fn9SFdGdD7JmoHCYDY34xzypBk6YYfqCesLH2aFtR6ZBlMvMWxPvqZ704I-8pI7B9bB1ShjTpYa3A57DVZvJDsAC-tJpPSwgzl-f_188EL-1XhOQiJ6PVG9-kZEzibX7i3jKFAnWfJPLkOXPH85ucFHXR2inBDGtx1Y7_04yCltjmrSh3IkyUQdpEEUUQrrGQfYBBH4dMHTq2vKKVbEHfi5tKfYAemgcw9a_T0FN6TtxjuDWn4Fr-r_SRNQZ5e-t6cRUXja85DGp6lYPj1H84NikMpD2ACfTyx9VI79ORN9iAHvShGFI_hcHuTVFCYpEsKOxm74oY5pKyMqPsQmIol01vPW6lrI3LlkaOBRViaS62p2i1SBGCSBMxDgTlqe1Nu8tmJvOXLIPleEG-zQtAIh3a-3eiVnLkpOr4HIiPqlpgmu4GMP5js1md2T2nl2sX_QXTJgZvPxAX28fPEDcczvMZ8KEQk8uTQSm99kCjtg71rSZiKH9mM1wK0RIGa4aFXViscFip5G5CE2MGWN8OZyNmLX3oiUQ3nG_TYcZcQbEXaTDo0ZXolW8gbs4zJ_KKqR72ArYUpRPMXWJsAQD7lK3I0sULfVHkZ8LvzogIZ2pHyH4aKMhnNkDcrf3esCdBwqAJsBDHtxxjGSodatC7yImu1v34N93uxbiXNVRXMSOT_HlTmitJsdxbWaT5K8nZBbVWQ0vOUjfBWmxIB7BE5yplyTgUZPby7Ptnku_Vv2KFRrhMOhXmBNJgp5qqDBbjZF0at8dGuyRGE2Pm1KQuoUjMGz6wDIGo5dLEHDU80Bq6PyueEuCICpASwAV01MxB92Df80Zoh5gyKkoH3c-FKAThh92SLQuOs0dzdsRUyINnn1iaa4u4Pkc=av&p=zOPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNXQlP-aNxWb9fFUK9m1BPJIoCJVhw-l_juBle7macYeoUS4luAeU5lO2qOlPfSLGJ_wyi91cAXk9l5VXG-_nz2ljIdhw0eg4IfEH_k3mleptndUqgEDcnLy_zw5ip3xFbPvCDFiBI_OWXACl-8V5NzOGhpfInlRk6dE0-52j1G6fjH9WU6kGwh8q7nFp6mic1Xsc30priV1rqK07Y96g1QoegPv6beo96xw3rKwUuWhwovOqIeY9zbaBZVymI-29si1MezigBBTliinFDKQivberGMat1sECwpdc7o_jJt_0qAnJwR0jBR4oXuOckAOKuyysJOrLM2QtqgufMA9lsckJJb_v6izjSqXLDwpfVbnptt9NwNaVxtqqpNrEV2LLdv6fHweki5Yw6mFaK7vM0gLpB21HMd3UyqY2wMh0TLbaUqKlqIg4Gl_Se1gqEFkeo7UOXlggV4LY6J--IwAPtaZFKPIhEDS6DyUcM15kEIfbT7gixGpxXz5IHZMDqSUg8ydPnbUmaroySGlQrmG_qZbxNT8NiwYm_99W-cDVv_V4JMN2L9zeE2rCnZsK-RR2kg_cHe8brLQe1aBhHWjrpAHqQ7IgGlwSVX7loKoFWaPiA7eUuC-_0rARLItSYcb6h9oAObvDCLk6lTVd_XoqnPUm_J64wy1KtcYUrsADEcmPtKV4FGoXIhdA0nmcy-MdYKs0jUFQTug9WThgNO5NTMDM0sA0h7FELa9MOdansBkmUlR4fdaHZ2HXeOAZUpqIZfUaI1WIl3XjzYdx9ENGqbIwIxrUkS1pVQ714jE8swLjYRTds0xgAiEoS3xrN_kdI7qIgqkuHUTk7LdT_E09eXrb9hio5bxji_qyhADE7sXDqqGZdrTiRc1XyMaOgremwu9WlD_QBk_Posuk0mJ4QdYAIcu8DNVkorLiabM-52ksEfeBxqTshvgIFOXBJoE7iJvjeqFNjbbTjn_cHbvi9n1i6flXxi3Fu9vFvRrbSiFw5uumZn8tzFSzC4oQzUe5c3R0OGjGFtiU-NyO1EXnuz8Iblglv02SqzE3RpWCcwi_zZDbCjWHqr-v392mt8DFMA=r7&p=tpnoxxlgBSPY=t5Og0slBpHHzPPMknxqk74APSGPwyjnRBnOKZHydmqgtd4NydkuFjFEmkT6LZ02hEmqwtaXwTnxHvVls6miETrU9xDZQPMnCCamnT2Y_sNXdciVNT4Lxaq5lZ1vZiYrZBCWVMX7BKSKoQV9vFGJlMxr8l3FjfCi8z33w6Kb8p4TAvH9muXpU6RzIDGlVknrbJyblm9YRmMBPb11uj_itgVQTKrpSfnw8DOnNQPmwp1N-JNM6ttgVGejRLQzO-ikNuggMbN9toU0pOiuzs6R384b9bYiQ7X92gW8gsMZIQZ3g_3Se6ksHzG9KAQ5k7R7O_4DmgOpCw_IgZfE1ACzCZtbgBJi9sA_nKOxKbphE_mjxaMwyP1_248LEQ0EyCx9o35y29bk-Jh7-a1NPlDCv-kzUiqETSJ4yMfmuLxEGf8929RVkCWAN5A0HW8n9Kw1ckSvnuXcuTSab67PX_s5_plIJWVoPrC8riNJ_y1R5QT3pawX1j_nj9xt8Bl-ZqeSVlPx7vwb3zFbgOVTleixzWfU6pPwGt3MtMVsAqR64tZnQtSg5sJ-Xdvf4uOLw3yWQK_GooKXurtgMjKzt5P2_LI7yjbo9w_QVYUHzesTtVxYYL_7_0nSvLyV64F03vXINvis0-KAdrweRFIbXIJa3rsA7XDigoEaWt9svNznJERyMrT-p2VlwncnxT6EefQ0ePpvldwTQFPcXHqJwaoeNSau6C3ylPLMa2o2iWPBIrSfDSZk62fPQiEfhX6OKZE0ti6c_c567dLt5lTYZEcTVs_4TfUsYanXhK1_vcMeuUK0NJHS5f93jmW8wkU0a7axQOfi9PS3Y_Y0lb34VSWOIiDoqdtiKd__EmEbOHSV5w5KxZ_jBFlVRboxx8LVH5xNZ4Yf66GSTC5PVeJBT6NotQa_WvYITduqTTBhI2w172AeQXaYzabubjR9a1SPmtjCt3Lr10FyIfeY5z2MnXW3F9rVeeJHr_DEY7mzTZqHMQSasKoLLyxhKPuZpfuHnlSZQeXcvH25cXeSxUZ6e6qKhvQHJcKgrVRoKxf0wlgG9rMmgTXlS4MaiKIRNFVkvqGUYTi4EuLsYO5N6aogUR-c2bTz9oz4T8nheWl4jMn7DPF-C0d8rxHZXZ9bka5px8wH8_gEcHt_5KOxm1KEgyZQXuDDI8x7gera8IGpLV6PKUc0=&p=29sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknh2jjMxW90LfgSXnzj4dwkhSfXN5HlrLJ7uZjFY6eiwETyfc7y2OJaneOvOFHNF0cc7jfTFE4Xj1pxU_miVCd-LLu8rhKTOUNcgvi7kIoCsfkMua83VAPhzETJdIhJkXmRDbw7jscwC5XdVkwLQiuaR6VBoyhE0Bkl6oWPbaKePXGGsIefy9DefJ_A458cGAuXbjy0x_oGtW4vdlF-k8nowfDyxnsDlQkFDItJi0WkiVrsE-hNFhvWlkVePNGSlJ8Xmxl5AC7ATgQbxj34p9WsUG_X1Ap86vC_P2_uA7K5THVm2t86dwzmsz8U0qA6ccXtJ6CvA9T5i9-lqplmrovjaHnM30Ht8aHF7_4r-w-Wf66MR2-tLP5_gBaAbkATFvFIpPYo_bW_dOX5Jwb15w-6eEX8R0z9oQ02Q9HQ3Q31iyFMKBWG0R_rOueSCE7uGn1fP3AcE5eTFBF-XcL7lUYQtkhGP8QApyrc1yPaknyYngDVA0sxTHAR3Fcnt1iKBSp01GartGAkRq4YnwBDiJMgV6JZhzhxMiEh67d_-7yX2LU0GYHCb7N424UrHw6SfSK5SYBU-VkXuNlYsHP9btqzj7fvwBF2Sya8r4HRwSFEKrkLB4kODBKUlKluE08gHJwPAlPpyvDEhKsRaTiyWDKQVaBQe3WXmxK5MHljX0Or-kBaGr0LcCcbKobMLje1t7QDkAb8S2fVsOztmqLgSuz_qd1N62vEh_A2r7DzFcH4zKt_w0SU50Vj8KRJrDfTxpUdmimwVD7LPBO3kyLcsXXMpWir205gwYKEFNENVTHXAHVD4Mk-3_INuvkY8cNYZ_w9RdUsMV3F7pbgghuitZ0Vhafx0e01VkK60jLOBU4gJY4PpZsQ1H8ubSWZIpoflRGwlmXCNpdrb5C4qY74oebd2_tRFPAed5uHKNy3Dr0T1TDWumt2E2hQrqw9L0hfttaXStZk87EQdZqsI8bcspwPAHAYcCFwz5QmPEuOR2KT35CalrPtuT45tkOFgS50em9qDRgN3lp5Ed2IM7yOL0G0xhSy5OTyzMmkPhqGFDg5IdZz_kRHmb0Qh9THJAoKwI_Q=&p=yFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASEnh_uLMsVKxIlpG0C5Q4ug603ctLVxzfjsT8qUyUG3iGWq0JoLvG0hgy3tdfUciFamvfTERZ8elU9jQBNiG1nqxXtTW6rjQw3XWGiYiqm2UJTM4WlQWWyRK6HwmvHvYg4JCNA8yDD8NjjwZ5vGrTx0YC87qFtgBBFisnZFu70sL3-1axkFWqdwaBuSLmweJvq6NTY4RRitPgp0hqVbOt_5xTqQiw_Dop3lJoYfmrUXkBphVPXkOxSSivyXaDUniPk9EMD2TzdtIQj0kdQ4idE4MW0Oqs08s5FqTt__CkbuBWPoAeOcE_c9nYbI58z_q-NWrsLGW2HYNg30QwKNYkfo19T11D9Cjh2WBd3ZoZnyV8XIuQXej_rGtDJu8xy7_i94C8iNf4PfGdsqRcQEHpT1kd2pSFgHqMaRfN1NuqVv0si7V5SwA-qU19Lw7KtSwDAv4zDTpQeNyfZ-PWbFCE5iJs-h6Pzg8vX5jKE2NPygNWtbikSbWmPNvStebbUmIdodEpME61aq5IB137HG3Gs-lBKmGZLNROgGpApmAtSCMRIEM7VIIdsXpkUs9GwtfQi_opHPANFuEVnIaVUXd5hE7TDLDA_azi6Cp_yv5sdXZSTWt6SanhBwE9vv7YawqVfXtvLAYV9Q3O6KoT2uYcHPxpy_4-JTAK4d5erS5nFhyXxZANj-wv47jxLxvA6MsUNxMhjcL0rV5thp7srCQPxYNZOwUcyh0ABHoY3g09BBFNVTFDy50HRVIBsOvNAyJXzm16H8pSOhE8yec5Y7Z7KNuR6qKJYblvKvGGs0dql6cnkDiuvEn66k6I5cPOqAieDa0YxvEkfbMuExE1xd1vuOXCDJkYgbNz18Bb8eQTflCtwfpT4kze-gctgKUV9TdvldyNMEOq9qwTML7Z6Oq4tAwEkJ94z6k68-ydgtdtJpGkRlzL9lWQWQzktESjb2D0XzAISVepdLU37cFDTFCWVI81lb00esplF-d1KIYq1rw4uNMS-pBhBqjUFqbNfnhxPRI8GtnyKeUA_2jKescOIRPujK-Wwpvo1TIxksG2vpL8VoJU4PUZTWTxdn2VFYeI4=q'
let jctqGiveBoxBody = 'p=x9sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknh2jjMxW90LfgSXnzj4dwkhSfXN5HlrLJ7uZjFY6eiwETyfc7y2OJaneOvOFHNF0cc7jfTFE4Xj1pxU_miVCd-LLu8rhKTOUNcgvi7kIoCsfkMua83VAPhzETJdIhJkXmRDbw7jscwC5XdVkwLQiuaR6VBoyhE0Bkl6oWPbaKePXGGsIefy9Def-14yW9m46tyWFZKfs64hOk13nUZbSP1_JHVnIVC0vhJWVpolWPZ1kt8FMLgwdrNan-rX8vwE2Bs8Nl4gMvTHtSIpCUQmCmMLJBbrPI9iQtdF0DO2--Y6sMCUa9QmYQXztqn2rbkJyxxn8sB7jqmiTSf7jzROerbfsgFkuIyoy9GRTh8HuS7XIxtHcBib80e4b_ULE6ygj5AuT43uggO2EWVZCCdR_MJPovV7TH9ceqlvLJzRp7GENgbrFzZuPjeEYKy2kcxpHEX-sfqEm5myyAnhlTEZtybMeT-ypdbdjeLBEXYcpojO7mhx9xpg9y2CtLEy_oADPz_bc6XqqgaRSrZJBVak9Ou7J_eQajTI2pvDxpX4o6CGVPL0QUFwaMLt3Xcn5o4XeOVHlqv9qOqTAnONTeQznC8AZpEJntUVRk88O4AP6mWfirmeqqQ-fZYcMrDnkJrraSu7Cvlt3liWhzzHZvodB_oC8XUfKhQF3Dn7nkCj0NACO-zsX1vE3kecWczrEJsIQYWHPXaD9PSmj3ui-xxvFVeYwz53GJ_kPlL_UiHnmAvUY1eKqnRAN8hrnlDBVveyN59uPVaA0zX8tj54SeR_UxlOUfLs6s57bqWpzPqj7Fpa0I7D33Qox1iBs-n3_ZBvStFXeJ61AgVh6mp7iHn6E5ikG1NzrBHqOy7V8GzQ0fUPeg3t-NWLXWe3zGDfCMTOmFgRaDO28rQA6RctBcAdbzdxpBlIanqxjxgsSZyqtskgDgN_Q7DyX_qtltge6Cmzcrnmc_jHqqi7_Wt3LiDE8W0wpNCwcphPv_2WDx-pP3zKqqN3zM_cV0JBt0ZW6nCdyZZYmxlzVyb9nlMCYWK-MniCB-fGlmSuXVP7_ebUpIxyn09wD4lfEfrh&p=kGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhCxU5ohFpckmhoBhfo2QChtUla9EU3JR7v972VcMQBI068A0e89Hj-VMQSqW1fuI0yBxPrYA6C9hJxXq-5w2UBH7kMYWjM3GwPvLG2gOyHmfqh5Cb3N_W0LEAtTm2i-XhTbsZwOQIs130llyYfdwF_Rh-mAjRF7VkYQfu-vUYZgcZVL7gQon0HNBzSvoUOsvp6iILpM5-jtKVYHptC0tprTQZ95cgBZNseuUfdiV0VaGpMXssT6N_qSs86KS10vWwn20eAkTH47JOTUeoyf6zeygoU3rpCkxfQyDRCjSM7eABdOq1HTiCZ-sCCu1GWU3-yd5INV30lynGv30F0JSy0n6jEGWCmT6IQ965CPAprxILJslgtsaL3ohU2RudFksduGDQOQFy0ElTh7b2UOM7JEUjToKV7L8thmjzF3OCVfgkaV9zPo12-osmBPwZSSEbNwj1O-m5b4m0e7IJPUslJ7RiCBCvpuNn_MvDEbHK8YMISyzJ_P5bAe7ek_wqC-o5HNLob7wEef2Zi_Xnf-BcyA2buoR9CTG2jVhQAej1pEiw8Vj1q-w6kfp24Y1GVpfouMmaz6C80hOhpAnVTK62ut0WnhHrIxX8bQlcqJqvXC_AW_aaC2ERzmZtYjIR9tH7o_IdN_QLOAdWM2HK40XRUv0sXsbgZRZn8-ifhS6pdSLPxpjQjGw4vPWmT7yBerVCfQBUvUHzXhd5rc6zLHHYePoZRaZFlfDlGz2rUm0dYmMQyFYlrthD6Ex7mFWK7BLN5dLxSvEQbnnsa91qXHIhi-JxOdjmCSvbjJBsACKl3uffrYs06Pg4d7MQj41MeOuJoCJA6zj1UoB2PQ6gEuR5-3rO2EkQzUkfIRpus99pAyTrr8fmYtyW8tsgx39I-v00J2a-YwvinN6tBslIynZMLXwkO5GMv2p7DpUFAA-0HNhvd6P1u0WJrGWsSmvgn1vn78zXGdhdXUo65zu2YgBrtZJnyaIn4nLgJPTHFMoskOtwqYok7okqf2HjCKXtMu9ezTjxauLXXlCYZzMx2SJX_ASeCQBp5toeDTySFRjgDNOgz6IttztRzb9'

let jctqCookieArr = []
let jctqBubbleBodyArr = []
let jctqGiveBoxBodyArr = []

let refHotShare = 'http://tq.xunsl.com/h5/hotShare/?'
let refRotory = 'https://tq.xunsl.com/html/rotaryTable/index.html?keyword_wyq=woyaoq.com&'


///////////////////////////////////////////////////////////////////

!(async () => {

    if(typeof $request !== "undefined")
    {
        $.msg(jsname+': 此脚本不做重写，请检查重写设置')
    }
    else
    {
        await checkEnv()
        
        numBoxbody = jctqCookieArr.length
        console.log(`找到${numBoxbody}个cookie`)
        
        for(let i=0; i<numBoxbody; i++) {
            console.log(`============= 账户${i+1} =============`)
            userCookie = jctqCookieArr[i]
            
            await queryShareStatus()
            await $.wait(1000)
            
            await queryGiveBoxStatus()
            await $.wait(1000)
            
            await queryBubbleStatus()
            await $.wait(1000)
            
            await getTaskListByWeather()
            await $.wait(1000)
            
            await queryRotaryTable()
            await $.wait(1000)
        }
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
        if ($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}

async function checkEnv() {
    
    if(jctqCookie) {
        if(jctqCookie.indexOf('&') > -1) {
            let jctqCookies = jctqCookie.split('@')
            for(let i=0; i<jctqCookies.length; i++) {
                jctqCookieArr.push(replaceCookie(jctqCookies[i]))
            }
        } else {
            
            jctqCookieArr.push(replaceCookie(jctqCookie))
        }
    }
    
    if(jctqBubbleBody) {
        if(jctqBubbleBody.indexOf('&') > -1) {
            let jctqBubbleBodyArrs = jctqBubbleBody.split('&')
            for(let i=0; i<jctqBubbleBodyArrs.length; i++) {
                jctqBubbleBodyArr.push(jctqBubbleBodyArrs[i])
            }
        } else {
            jctqBubbleBodyArr.push(jctqBubbleBody)
        }
    }
    
    if(jctqGiveBoxBody) {
        if(jctqGiveBoxBody.indexOf('&') > -1) {
            let jctqGiveBoxBodyArrs = jctqGiveBoxBody.split('&')
            for(let i=0; i<jctqGiveBoxBodyArrs.length; i++) {
                jctqGiveBoxBodyArr.push(jctqGiveBoxBodyArrs[i])
            }
        } else {
            jctqGiveBoxBodyArr.push(jctqGiveBoxBody)
        }
    }
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

//时段转发以及转发页面红包冷却查询 -- 30分钟一次
async function queryShareStatus() {
    let caller = printCaller()
    let url = 'http://tq.xunsl.com/WebApi/ShareNew/bereadExtraList'
    let urlObject = populatePostUrl(url,refHotShare,userCookie)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    let curTime = new Date()
    let currentHour = curTime.getHours()
    let action = ''
    if(currentHour>=5 && currentHour<10) {
        action = 'beread_extra_reward_one'
    } else if(currentHour>=11 && currentHour<16) {
        action = 'beread_extra_reward_two'
    } else if(currentHour>=17 && currentHour<22) {
        action = 'beread_extra_reward_three'
    }
    
    if(result.code == 200) {
        if(result.data && result.data.taskList && Array.isArray(result.data.taskList)) {
            let taskList = result.data.taskList
            for(let i=0; i<taskList.length; i++) {
                let taskItem = taskList[i]
                if(taskItem.action.indexOf('time_packet_reward') > -1) {
                    if(taskItem.status == 1) {
                        console.log(`\n转发页面定时宝箱可领取`)
                        await $.wait(1000)
                        await getRewardShareBox()
                    } else {
                        let cdTime = taskItem.total_time - taskItem.countdown
                        console.log(`\n转发页面定时宝箱冷却时间：${cdTime}秒`)
                        if(cdTime < 90) {
                            let waitTime = cdTime+1
                            console.log(`\n等待${waitTime}秒后尝试领取`)
                            await $.wait(waitTime*1000)
                            await queryShareStatus()
                        }
                    }
                }
                if(action && taskItem.action.indexOf(action) > -1) {
                    if(taskItem.status == 0) {
                        console.log(`\n开始做${taskItem.name}转发任务`)
                        await $.wait(1000)
                        await listsNewTag()
                        await $.wait(1000)
                        await execExtractTask(taskItem.action,taskItem.name)
                    } else {
                        console.log(`\n${taskItem.name}转发已完成`)
                    }
                }
            }
        }
    } else {
        console.log(`\n转发页面查询失败：${result.msg}`)
    }
}

//转发页面红包领取 -- 30分钟一次
async function getRewardShareBox() {
    let caller = printCaller()
    let url = 'http://tq.xunsl.com/WebApi/TimePacket/getReward'
    let urlObject = populatePostUrl(url,refHotShare,userCookie)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.code == 1) {
        console.log(`领取转发页面定时宝箱成功：获得${result.data.score}金币`)
    } else {
        console.log(`领取转发页面定时宝箱失败：${result.msg}`)
    }
}

//转发页面列表
async function listsNewTag() {
    let caller = printCaller()
    let url = 'http://tq.xunsl.com/WebApi/ArticleTop/listsNewTag'
    let urlObject = populatePostUrl(url,refHotShare,userCookie)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        if(result.data && result.data.items && Array.isArray(result.data.items)) {
            let shareIdx = Math.floor(Math.random()*result.data.items.length)
            let newsItem = result.data.items[shareIdx]
            await $.wait(1000)
            await getShareArticleReward(newsItem.id)
        }
    } else {
        console.log(`查询转发页面列表失败：${result.msg}`)
    }
}

//转发文章
async function getShareArticleReward(articleId) {
    let caller = printCaller()
    let url = 'http://tq.xunsl.com/WebApi/ShareNew/getShareArticleReward'
    let reqBody = userCookie + '&article_id=' + articleId
    let urlObject = populatePostUrl(url,refHotShare,reqBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        if(result.data.share == 1) {
            console.log(`转发文章成功`)
        }
    } else {
        console.log(`转发文章失败：${result.msg}`)
    }
}

//转发时段奖励
async function execExtractTask(action,name) {
    let caller = printCaller()
    let url = 'http://tq.xunsl.com/WebApi/ShareNew/execExtractTask'
    let reqBody = userCookie + '&action=' + action
    let urlObject = populatePostUrl(url,refHotShare,reqBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.code == 200) {
        console.log(`领取${name}转发奖励成功`)
    } else {
        console.log(`领取${name}转发奖励失败：${result.msg}`)
    }
}

//首页气泡红包查询
async function queryBubbleStatus() {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v17/weather/index.json?' + userCookie
    let urlObject = populateGetUrl(url,refHotShare)
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        let numBody = jctqBubbleBodyArr.length
        if(numBody > 0) {
            if(result.items && result.items.bubble && Array.isArray(result.items.bubble)) {
                let bubbleList = result.items.bubble
                let numBubble = bubbleList.length
                console.log(`\n共有${numBubble}个气泡红包可以领取，找到${numBody}个气泡和翻倍body，开始尝试领取`)
                for(let i=0; i<numBody; i++) {
                    let bubbleBodyItem = jctqBubbleBodyArr[i]
                    await $.wait(500)
                    await getRewardBubble(bubbleBodyItem)
                    if(i != numBody-1) {
                        let randomTime = Math.floor(Math.random()*2000)+32000
                        console.log(`\n随机延迟${randomTime}ms后尝试领取下一个`)
                        await $.wait(randomTime)
                    }
                }
            } else {
                console.log(`\n没有可领取的首页气泡红包`)
            }
        } else {
            console.log(`\n没有找到首页气泡红包和翻倍body，如果需要请手动领取和观看翻倍视频获取body`)
        }
    } else {
        console.log(`\n首页气泡红包查询失败：${result.msg}`)
    }
}

//首页气泡红包领取/翻倍
async function getRewardBubble(bubbleBodyItem) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/weather/giveTimeInterval.json'
    let urlObject = populatePostUrl(url,refHotShare,bubbleBodyItem)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        console.log(`领取首页气泡红包/翻倍成功：获得${result.items.score}金币`)
    } else {
        console.log(`领取首页气泡红包/翻倍失败：${result.message}`)
    }
}

//福利页面定时宝箱查询
async function queryGiveBoxStatus() {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v17/Weather/getBoxByweather.json?' + userCookie
    let urlObject = populateGetUrl(url,refHotShare)
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        let numBody = jctqGiveBoxBodyArr.length
        if(numBody > 1) {
            if(result.items.status == 1) {
                console.log(`\n福利页面定时宝箱可领取，找到${numBody}个宝箱body，开始尝试领取`)
                for(let i=0; i<numBody; i++) {
                    let giveBoxBodyItem = jctqGiveBoxBodyArr[i]
                    await $.wait(500)
                    await getRewardGiveBox(giveBoxBodyItem)
                    if(i != numBody-1) {
                        let randomTime = Math.floor(Math.random()*2000)+32000
                        console.log(`\n随机延迟${randomTime}ms后尝试领取下一个`)
                        await $.wait(randomTime)
                    }
                }
            } else {
                let cdTime = result.items.count_down
                console.log(`\n福利页面定时宝箱冷却时间：${cdTime}秒`)
                if(cdTime < 90) {
                    let waitTime = cdTime+1
                    console.log(`\n等待${waitTime}秒后尝试领取`)
                    await $.wait(waitTime*1000)
                    await queryGiveBoxStatus()
                }
            }
        } else {
            console.log(`\n没找到福利页面宝箱body，如果需要请手动领取和观看翻倍视频获取body`)
        }
    } else {
        console.log(`\n福利页面定时宝箱查询失败：${result.msg}`)
    }
}

//福利页面定时宝箱领取
async function getRewardGiveBox(giveBoxBodyItem) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/Weather/giveBoxOnWeather.json'
    let urlObject = populatePostUrl(url,refHotShare,giveBoxBodyItem)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        console.log(`领取福利页面定时宝箱成功：获得${result.items.score}金币`)
    } else {
        console.log(`领取福利页面定时宝箱失败：${result.message}`)
    }
}

//抽奖状态查询
async function queryRotaryTable() {
    rndtime = Math.floor(new Date().getTime())
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/WebApi/RotaryTable/getData?_='+rndtime
    let urlObject = populatePostUrl(url,refRotory,userCookie)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        console.log(`\n准备抽奖，当前已抽奖：${result.data.opened}次，剩余抽奖次数：${result.data.remainTurn}次`)
        numTurn = result.data.remainTurn > 5 ? 5 : result.data.remainTurn
        if(numTurn > 0) {
            for(let i=0; i<numTurn; i++) {
                await $.wait(Math.floor(Math.random()*1000)+1000)
                await turnRotary()
            }
        }
        numOpen = result.data.opened + numTurn
        if(Array.isArray(result.data.chestOpen)) {
            let chestOpen = result.data.chestOpen
            for(let i=0; i<chestOpen.length; i++) {
                boxItem = chestOpen[i]
                if(boxItem.received == 0 && numOpen >= boxItem.times) {
                    randomTime = Math.floor(Math.random()*5000)+30000
                    console.log(`随机延迟 ${randomTime}ms 看视频开抽奖宝箱`)
                    await $.wait(randomTime)
                    await chestReward(i+1)
                }
            }
        }
    } else {
        console.log(`抽奖次数查询失败：${result.msg}`)
    }
}

//抽奖宝箱
async function chestReward(idx) {
    rndtime = Math.floor(new Date().getTime())
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/WebApi/RotaryTable/chestReward?_='+rndtime
    let reqBody = userCookie + '&num=' + idx
    let urlObject = populatePostUrl(url,refRotory,reqBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        console.log(`开抽奖第${idx}个宝箱获得${result.data.score}金币`)
    } else {
        console.log(`开抽奖宝箱失败：${result.msg}`)
    }
}

//抽奖
async function turnRotary() {
    rndtime = Math.floor(new Date().getTime())
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/WebApi/RotaryTable/turnRotary?_='+rndtime
    let urlObject = populatePostUrl(url,refRotory,userCookie)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
        console.log(`抽奖获得${result.data.score}金币，剩余抽奖次数${result.data.remainTurn}`)
    } else {
        console.log(`抽奖失败：${result.msg}`)
    }
}

//查询日常任务进度
async function getTaskListByWeather() {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v17/NewTask/getTaskListByWeather.json?' + userCookie
    let urlObject = populateGetUrl(url,refHotShare)
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        if(Array.isArray(result.items.daily)) {
            for(let i=0; i<result.items.daily.length; i++) {
                let dailyItem = result.items.daily[i]
                if(dailyItem.id == 10) {
                    if(dailyItem.title_num < dailyItem.title_total) {
                        randomTime = Math.floor(Math.random()*5000)+30000
                        console.log(`\n去刷福利视频，已完成${dailyItem.title_num}次，随机延迟 ${randomTime}ms 看视频`)
                        await $.wait(randomTime)
                        await recordVideoNum()
                    }
                }
            }
        }
    } else {
        console.log(`\n任务列表查询错误：${result.message}`)
    }
}

//刷福利视频
async function recordVideoNum() {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/V17/NewTask/recordNum.json?' + userCookie
    let urlObject = populateGetUrl(url,refHotShare)
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        console.log(`刷福利视频成功`)
    } else {
        console.log(`刷福利视频失败`)
    }
}
////////////////////////////////////////////////////////////////////
function populatePostUrl(url,referer,reqBody){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
            'Referer' : referer + userCookie,
        },
        body: reqBody
    }
    return urlObject;
}

function populateGetUrl(url,referer){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
            'Referer' : referer + userCookie,
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

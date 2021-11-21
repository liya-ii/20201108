const $ = new Env('晶彩看点-基本任务');

const hour = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
const minute = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getMinutes();

const TS = Math.round((new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000) / 1000);
let i = '',m = '',n = '',s = '';

let basicApi = 'CommonReward/toGetReward.json',signBody = 'p=S1HH-fn083Io=oMisThwCJ-M4N7AfqRNmBLNlIZYdczPsacy5M1LBv2_ePTexZoppgkZNDH9txXi_vZJqBXxttelEt4pspONzD6tID-1Q9unup0aWqX-SLYHusdXWvulwNq6vFsMnEmAyr8dcJRAfJ44eZknML4PENZe-iV5gznuXPJoa7OqQJ4Ruqx5VyoI7Ju3l5nA-XOIdZPFzFmyp74tXsKVbbNxkdGILFgOK3j54dXNl0rIjbwlTeAH2j0MfuVedeb8oQeR5DhyYZE6B7f-Bhc8Sh2jzUWIRP7yypE7SaUt6LuB3fRyVhTW2R2gVZbV-fJSxNAzZ74q-0ELrTTxP1NWCVGD76tFXvWSj1-xNMz5-Vy4mQioiEdJ-Xy0jrXMAQYVr5zbfEiTZZwX_LIZGld7i3b6PmSDOc5MLK_Cb5rJFaOhe_04sh7fkcSl-8fmSjKMNKSIVnUfOQ15LZiOoEETW6ig5JNOxOY7rzBxPOHZIej7L99bT5im2vpjGGWWHpY8k0ifKuOYZbLm5HjGDz5ZJTLy6T16w2pSkNy_P9z2NqABsjd63M-dwy7Cj-YAr7lIRTZ-dUuOoH0f_eVVEeZ8XRwOQ203qDRqrGK95-Km9WQgOVsMqtDVdvDVsuav1L7K7FGUE9PeyVSrWXCIOoA4oKl-PMqQ2b6wi4wHYulJfmsG5PhT6Hwh-njnVV3kpRrXbi7neiO2_v8mRr8YJauWHLx7z5eQJp8lYeIkwWpUjOL40JQ_mN-0VOqJ_anRq8KgauuZy_TF2dbKtVgGexHwsrBh3VcCTsRvxg60V9jfRTYLLzYt_7m2aj_j34AUFBuBZOLQaMdH0BOrDx2XxdnBJemzdJIGFQ9rYPLsmfw4N9gNrNfagcK7n0yW-hDKXiK2B-INGPmaghgqzSHVKiNY8yoRPD6H9YlpaIlIJofWUccqRNizOukkfYgKxijpUEVON9daphGIM0ETuZQ7sJNHjF6WitiCb_D2MNORqQupX0dHXr7WZPdeWqGt6kW9FyiwS0D53boxTmre_oyYEJ3cmalAguKYyNbLZosemOtr3wzUPOVSK0ubqusguYo7hIXl9SyadJ4hKyvdO5kdS7Y_vDys6ybDqRJvseTtHkwDj2-EtCjEGiF979IqDn82b_f7yrjrRTT8p1AeSaDgtFDVghqBHZoxWx9IXNiJROk0mfJuTirs=';
let doubleSignApi = 'CommonReward/toDouble.json',doubleSignBody = 'p=W7jvhIkVyrvg=ANvXoumpFwOrXuoVAqVeHT14bq1NhTJzbiqZqy_MXXKS5wUQIXgfDWO7_Ilv4K1nbRGCSK-Hxjb9hXdJ9XKEMvKUOuTNODlUYFP8SbH-vz1IvT96yV-RpDq5kSg9bttEzh5aX-8dMo3_SpTQLSaA2DatIOS47YdSe0iuczTrktPtViTtDLfTA9smSWFKi-5703qBbEAM8GrsZF0V5a9122OY-qgJgzaFMIiqC3RSflM9hpvsaWnOw_-rCYb8u9dDZQQ9KpPV82CDqQID-VyU5PbLk6rmZWHgYHx15pxsGP89SqnTRN9PsvOMj2xj5qFMvc33utOPWKMZA6AiYEBNYeedLZSclCwDeTqMrBolF7YY2VK1MdD-qTyYUcpM6CQ5C_sHD-NVg27ZBQpghfzdb8SdAglHdFZ4SeFMvN3CylL2V4RjCk1bWvWwfPd3oINJI_sNtnQTsExoYQ4wpRvvSyfAt799g0PM7I6iHQz2nJUBJ2k3F88xxwc0H6ypFhWbois2lqhUUozjkjR9Go3X9qZQZrw0a5ZhloJ0_Eb48tXnBRFnM2-L0kyi4W5QpAvOmiFPTROsM4pqTd2YqBHu_GKbKv36eKgbUJzhkuifYjrOtDM1HHghIHqky6tYnkLlbalbngnz6tTqR9fHNHvlPcncd4GAhfozrMzRbbJ6td4-49lQv1UdvTdOFzUjo8wmqWuFbnx3ApQZAKNWO0J8222kZen-Awa9Ev38s0IfFKPiBLsewdoo0HAhBYhhHXpsx_LWQgzZbNlZxxgRT32qU0s_iy2447W6Yuoptu4wNUj4GXc5bXhmD5vSWgjtJn01UfBLUfRAUZ98PAR6VAY96H0k3aujgzaMdfEIDgTzqCqcbuRzcVjZVbcOJMLU0c_nc44kREbswEDTu-mOSAQBjGVKKY8vfXjuVVKAGcZJF906pqJTN8V_Jd5phvdvZy-O7lOJV0MnVbDNc9oVbppdZu_mVVrfQnAP-At_Q-xnz-vG-qF1o97CwO_QcuLFlWHxWM3Ejt_fIkWQNntylvTnTdquIw5dXSnk7oic6za8YUimdFKAG-vyRHQHTbMchB94lFlia7vjBYTyVnRytTdAuOSf9cyOD9pb2F4qskxNxJINCkGI1esDZODlj0qASmO1ODHFHRrnvbL_140e858T3niH8Mn0HSb9eSaGPd4oSL6lVvEV43wWdg==G';
let sdBody = 'p=q1HH-fn083Io=kcwK6k8y-7-OHdSqcwNtVie95kAmloPTuzq5WjMQiieyEQ0jp4gXthoch_OMNeK-D-w14_UAlHjiIx_8ZwkFGfETCf2INPpXURw5DEVSe9HsGDWklvgYSwTqo1WJW59gnOq5ESWQiGbydnG-uHFZDR57epDaFGYR8dgYDBPFJKTegJfIigUNJqwp6ff-mkjfKF-G74eRHBWazS3UKfdi6SRC1S4EKfVtRLwE7ZcUhIy4LRP4vKsecDFtlMw27U1mul8c7GHDc7zc0NVQSgK8YWk8ddHVc2F7ykBRUXS1yWUzgHFy2PrmFfElHRKPrnvvZxzrV10Mo9srIoqVFQjb4vUkyyZj-uq7l72ZB3f0Bx7OztE0wbYAjRprY4uEa432IdOyM80ICp-3duG1kEBVDRCmYiHbwldX0giginBsLv9grtdnQiW-yilFCNaBh5ilpay0Uu5HuU6chkolXI_AdZR5h4S4JmCxuEwp9u8tU4juh6Eg7aAtLpN5th4yzF_KtgyXnuQyFBfyJtxOIkQ5haJWJEiXDBqB2eMm0l8Hsn3SxupwJVuVTlVQ1OXTMK6nfLiO2Yymr369DHxfibx6loTU0OjFDxm-HoRtLfSTeCSVy6ulZu1zKn6nFDGFFZdFtw9YUdlvdRR-UIpvgHJoc9jywKpfI6MVdV8_O-RK8ebWNBB2ZobzO6q1Es4Q_DyG05iBu9EZQTn_WOP7s86Z4nSBoL0d5-f0Lk-qD6SW25e0pah_CwIlNpEqcSq520WnRQBpk4B5h3RygkyR8VYBIyB3ZEgl0vQhW7vOg6y3KyeLGasHAY38g1bwf7h2qTOWNH4Tqlu3AOYA5tqLrG0vSovpkQBIJV6yg5ozUWfAsK9e57SqqxhEA49lPNhRDUmQ2PZyod3mRAPwCr1gTQOOTrdfxdUIKQzFEcNReFLFgK3g1IvtEZfz_GC1Sg1_KVAhTG2sTxDECNRI7dExKBXxVZmPBhmyeLV9B2IMzxxXS8PCEyz1_uOH3pDLQXVEaG_EGdo5bwVU5CoEiMsDmL_0xw8XVyLrkr76MRP7iN_FHmebZ5wCNlSUBuhud7GMZMAXFP2AmCIF_uJ9SAs2P1CwjSGfMptgRDLFc3BICz_xmxphyYresKzDgoQv5_Tw3YzJQ5ZyFIo4S4M=';

let syhb_common = 'p=f4W7v2WlUNXk=OizDqIly7NWI8mNFoeFk-qq-O2z20KPpHBywxONYCcbTbQiIJDRliVhBapXgjWQOoEBDgVgHJ3g8IOaDulYUnlBtvn8C_DCOWMJoSAJIAhkR8vuuw8N8ga96-5rZpip4__QOeF7WUV2mXC6hT3VCv2r3lFGhJLkZ9RmTUGDSH-cyikDNzrZChL6dY4IVkO6xj98o4TrQoeXJFM6_snxIUiUW5dWWpqgtzYN9BbDPGW-EVZYoBOJnGiAvwkesmdz1f_KkI9dUJEjPKQrxde5aV8bVVPzcBkkRhln3q1REbA0ZpP4D_B_H00mbXXDtZuua29aeBD9mn7iifRqBqu43aQxCmD8dKxAWvWVmqpjV54GOXUlc43Fm_9ePx4M6VvdS1HaTh8eBsTTTHo_YUPyDJ-82pgIwBpg8mgBivAvf98CVBcv2LXPnvjHSUUKo5fWhrOnmEUun_YuXkeyu9ZOICqIw7UtJLnoBCf95O_Uf7sIrfqolZ4ZpY5fmNTL4QOLEdaCrx2J9YA9F5BCHSTZSrBGY4oKshZHLCDsrEdlNlittrIoLQ6fZIzHOzr0uJMzjXuItBcB8pxZl3DXrKh5BHe7M-_hNQshfL3WCTFToJaLPncE-jNdvEsgmaFJntSiIaj6npmly9EMIDrT0acw3vcahQq9ujwahKOEOb8mNzaLHs_nAgrWO8meqwdI6xOQHpvRPygHKOwOe7TLp_IADFjCwCjUz_XlbqubWul9mfwZsput1LVMn-OPQpjKdzWD7w30E_MTGu_1KQEPLjLiilluhk45q_oduZfS42ACmWKJVwGIHw0mJTTfUq4uZUrZ5_c5raNSth2SjebbkK5SrVNqav4lWCFHIECcKQQNVvl0cVJ0WTpvpdlcDGaKd9jLdG0_djsqmOj6Uh_m7ZWDA1Q3Bg7YlqzMV3SeTVnlHFpWwUZn_C4YGdonPWgzEe7l86U6ypkI7g3Xi0o1WnJtttRAEuUpkv1mufGfUHDVpWgiGzJBSjstHTrlMmuaCycmFiSGAaOBTiMZDdP9bjyyLovNfWO1A0sn4VAoPt1qJRjECRZOog0H6oZM6bIXFpRy-H8Di9zNiphEPgHmV60dfxWzeQEU4Ghs5BLvk1NkBnEwnWFcy5R1M9jaKgh54UTwe_bhMS5XN_B1HCzBXGWYtQUPmNkU7mylCNepS_a5Klh8=f4';

let read20_Prize = 'p=Tb9vgm3fvNuU=n8ObWhIWDETjYL3wOqEESKFu4NSPeeUz7gYAdj5T_qFpJ97TF5K3meKN_SpUsZGWbDeCVX5oATOLyaT-u0bgDIbrXKeLSBy5HeGubt0eYhJp-GtdPW1gM0c_1gML4Wh5nyKEW_QL6boimbBzCOQDvYeo17b18YvghJLB_b-ijZoOuj-tji4V2hWoxZXHdQ0PiLd4XI37TuvnjNhECYvjP7w4Iy6beUVtd0KPNn7qb55FRvwRwYluEDmOTiK9swa-zUkTJIsxWfzvq29-KyxcHjvt7rBKupsT61G2y5rsAxDFaHdgTofK0XYCdQbm3FNF7oQgoeuB-79WnHmuy_Uec0c6dsmWpYaE6l3VuNUxnR0RKzPBZSmJ7ewJyFBbN7ufpyfJHb4tmHpRqN203pMBQyvzmWE5Q6LxmMePSPly8NLGQyh4ll6B94VqwwATyOjq8Wr7N-Pu9P_MCUGxoLgoltLYZMv-YRLPvSvOS3BduSreppC4yHI7ZncIhIU5dSchkfCoqQnr11XgzxENDTlQjYArmcy6MRQJVtzlprThYYdZqrC3iy28ekAwymWwJmqbaiwcvmCkI0Sqktkud6CvtWI1h7o_yEqeAXCJAxZzOp_wjC4K81ke9jIVNe7LJErAD9rSoUVUPKOb2RgVWXdjlgUd2MOrCxfaHrrLlOohA7zWAf4VJfW0MhIHXEexe3ip5SA2hkjMIe0eRABsI2HVFT1aCimQ7lEouk9SBVvjakrZxEguWp7ePWWuad4D3ZUXESKCVWo28LJBLJJ4yJ-O1A1Dl11GMTrYlThsMWGVfbfFo_d9pi8yZ-rJkVayftJViAH6bhA-jaRmDOZWQnM4ZKNc1I2SZu7w_IaowEgAfsay0C7UihPV_e6sxDJlwY4GKChsPvmDIChLpa9C7fST7uFM5MU9LWaEryVIjnFZFZ_nzDNk5NnLhBkNyZf821z6pIol2iGKyKR8S8yr6zj-Yvthy9F8Y6grHTME0Q3LAdDRqqrjMATsd10ULnND3EhOLDyym7f6WPlsnvIeMBTB9VZWK7oBgea_x9aBxyVbLVNRSm9706WSEdynqXqEPBSCONzVbVLmhv1YwYRK17apFLaVhPQ0zQyKaAPcUgBqANKa2DqwiGsQlmp0sDIBeoW6IIGoCZaq0kbBC5R6BpE71hem9yUovoIiazrRBPSp4BynJm-sJtQpng==r';

let video10_Prize = '';

let flsp_Prize = 'p=u7jvhIkVyrvg=NJVCj7xpUhc89Tmu_e_xo75_bhWiKHbWiiflyFj9K9PcPG8atQjBQB2IsUA7zmuvQgqz6s3W7lO7fEmY9tcJK8H2NvCi-s4NsbaLFwQT2JkfJ2HMX68Vy0IQ9XJeXBe62hB-o5Fh35UA7rBWP5z6AYd05SatBY0GGMgLQ4iG-5auqbKGK8kXMH9lKx5VT5zSByJ3bBNeKpQtBxXShV5gtbJNISDSiC-us_DBzUemJB-EF-h9NCJqn5_YA30b_Vffz8TY_IYKPGbpkDooJFB499v1pUHMNFv8c4bXA-u1jNs0aJWfrBFkqMzFkzmj9eT9Rkv5h9a954Ps4JHINL_p0sWAlZToZtchw8_k2qiOu3BeB-yixFsLvVYnFojMHMVeDBpM5DTK31H_gVPOUpCfwueKfQuoPDlfUmHbKbnxuokMw0xKxqkOvOcQhkvvSsemccnn4zs7JYSgA0QWj3HxVrRns58qnv2c5e11jqhLRxHZzdBkooU6VUVncJNOeg4KF_H49BCEUVTCehdH2AK18vGx-h617S7LAI7cANohEUv-bIjm5hTt1oQ99vu7LQKPS4FwsPc5dxLIfk4UlPRDKzUW31uBa0bYBTCMmX6EwRnS82tjI84PkUPRlfreH7QChAo5PcAm-kZ3UiXBS_SOTTyZFLxcIAdNQeirjatBMxOsljO7w68_adydiWksyxPMQAwCqImrBCKSNF3ivRk8Y-RCxYiEdko1CBqxebqw5CEyRhGtVSa72PdW7m0V34WCaTXgV3UZSbNTzIUDtJ4yaf5Leyxtxm1cBFAsajPkfl1bDiXye5g-m5pjWB9VtVlacJgln5wyokqy8BABC_bwED9UUZCQfeKOhK_UrxcX9gNyOZMYG7Tb7YR2Vgkh1IM-K3zmB9QrNYFP-u1Tq-NctCcV4hV0cwl7uptwzcvDlXE-nK9x5IxtbwcZaTrSeloAPEpIkDVwA8B-Av_lxuDprLsQFR2ZiZkZuw3WbLVMrjA5AViCb_e8bMns5gvyIl8pIZkaqJjenof3Hyq8q18ZPvs2Z4gU2TbvRKc9Xw9clA82h5EE6IlOiKqqwbp2-ZfZJi7nwGIJKzyyNyYH5paA6T1DO5odES3h8xPDbN9TTzaYRTx7zDGizQTG8aLLw9dI-8Jiv1xLFw1FVWH8xT26cGsEs7MQ-JiZrlSBhjyW0EeUJIvtTwwgOg==3';

let prize3_body = 'p=H4W7v2WlUNXk=4_R2i7zN1lpC5fWIpOpb_XsK4dF3L8tEaKysFymDOids4DvDqudpn8-blPoICxkhqDVHSkhExL4OlNftuZAu1lsxEEQEEtC1sGcm8GO_kTQGV_rcM4HBH9NhDKjt8Yw9yms0Om4bokqyz7EHr3c8tp04DQB8akbparOgKwtICO-3IIy9pv9YctB9gDklh5uHAXYaSYyhmwPRcaDeqYH-GHrRugQN_ilcP5jEgcmmJhfJ3EpwdwprxhE0AQZhFwRb6xl-VedgyfP9xerS7qjaM-tU0w72vxGM9pT3CA8CWiLD-0Jcru00RlMGYg-Hhy8N_ZTxSKgsEVPnDu_7ljp8sMHImYLTP4sGgpYReFcSGYkIKydY6gU0UHtT_rWNe7U8j-nrBTZ9ee5ka1_eTmj2p7svdGL--Xhd2q45GK2z9dRerzH5NuzSlF3-lQJm9NjNM3Rv330D2Ubs8hLBRF-LfXzZVrrwKCz4xAlazaBoueerhCUhtvgvq2dxAXgrJNvUWvAed_8PA-hk-meB05ceAAFKpQfU1nDp2fM4gSq-lUCKN2-esiwC9E2ouhRPrt3gtjToVhYqkk89vC5xfo0ECx60MgbiHWPBUOm3j6SCqDXseNo8WFhjjmbeDlNhqeEGpHm0aDfzoAyaTw1hDDIgf6GDwfYFqL1MgTQuEghwZ9bkb9K1jM4rGYbnhravAofxJtO7WjeUjhBEmXsvQJvUe1I_6KVnPif2z3IYxM5bE9jUVDW43haxlZw9qZYTk4dTMFL4BLmAa7QDozDd2YoW3PKsWoPja66vkrkTkFiwSP1NWykSBD8iXruybINFRHQG2a_AQceL0M3pcQ6HfTGv62HpG85hwUT72uEhoyw-ASX-l6LJnK7tnCdjaKK4B5WlkhMbf8h9eJgp2K2D4Z3SsPRoAGK6-gw8oFcNb5erY649tmwJQJT-HUnrnPRFlNh4GSbRZQ1_CYLGxEk3FC2o2tqjnDFmSUimkmIfoIms5j5H-I949x4sSWc7G8YYdlw01lRj7C6Ivae57DER77Vyj2fXSjk0Er4rFSms_EhzSOCAgS85CJ8mpCIUyff5yYapdd2qrDw3LerJwN_efW21PILPPMoAQjKWGX1kakmFPZh6x0kNKsUl35q_RLQQ-1zGv5voZiMLQe-Pda4KrtyhypnaD-BCC7NfKq4kC3k9nik=H4',prize6_body = 'p=2WRHEiWXZdUk=P3cEFJNYe4vKCJN66PNA7ILtsZkAE7I7GEud8IclEFiX2_kVM0UczinMt95JFVNwTkFbNmj8_Qj5vD0jAxL1x0VCI0AKscmYqIA8N-h4RpDVGfb2fOhqGlzmpHAGoFCpfOpJYt4n3WloJtJxeGSvHN2R0WCU2h121AKwJebGCVlrYzwnn7BEgd4zqMhBBHE2Az84wbGGjhBc57kPvT5279HSEpnS6OMeUiuxBwli3b7rHbv7XgTRXAK67cpPrpHbeQtWC2NyNKZc9jeDsccdKfEdZ0zRzSScDAF1r9Pve7b0plmBOyTt04GvjYOWCBs8k0OfC-RszqcEXexhS3OZXc1Jaf_e9LVUDjbP1BpcvvwAdMdXiS6KDSHPnZ6AdCjs5G3CwmdR0wmD2qXqr2QmklBlwoYhcIsk3naOl_qg4qh6X9exSZb9Lu09zceepXHuin6WPmF4emoctlK2AGmMr3Yn7NVEM6y9hh2VTOL47CtTywSDT21tvHBanTbpaiX3qsGDKfrHlGXRvdSvMCK5SsDjbz7NgGfnXlruhsLjvFO3bHCzafyeuPgo9uVtohzufSDKUz6nPrSc4YtZ1nvp_-MG1UqWD0iDLVVjIUwYzNJjMGnLDpKk1QfMtb447kY421kHwT83Qb1y8LedTryaER6GJ4qT8MURYKx6wSAAug9jadmt8lTmypBzGAKXd8zVr9PYxbuEjLBkpll0ujeYuEQhAhTljpuFh8nINoUUahCJVNncrEcglU_JEuP_GiaOFy4fsTtdshGGCnPcY5_NwwHYTb3I-Chrrt44wYT1rKWYN-3RP46TwqU4xAAgygUHbbZ21BRmr2F8c58YKZWyvVfdPgI6YOBia1dlGxlBGpL960SINQDMOVwvgTXeQ7KChYbU9m5xikBDZscP0ynsGrdsbZeZ0D2qXiFFCTbyEnoxjhTvTod_gMK4ffzzJAnM6rNqA6wiPu3vZA-k9aqjhbz5F_o7ahldDMFix6W_c0z16ZvQOr4S2LJXP7Wd5EEU1vA_6yS1ZOUNHzH-dtGy9sg3RrqHOb0w1to2BuJjlfoS8BpO5rVHDiddiOUkgEhIDpsFvHoiY-O9MiAYBHoXjXxc3L9eeZM0EWfX4sFskgCiN8FPD7K333Pqi6YFFpusySgbXJqvNQYql1lp6D546MZRsoto2k5r';

let scApi = 'user/stay.json',scBody = '';

let share_prize = 'p=swQenZDazcfA=KMsa5bHeGq6KIPxbPXTy_AEnu6AWVllVk8f4tnhFlGTB1ZB3JqjeSTTI0k2gH5_xySpbtvwFxzmgIu22fMYGX03j_1U97STzveM9w_gD1lhnSrhl3rs1yv3yTn3f0yjj7SfpuEWXQQGYfh_alh9zazDl9Ep8BLJ6LbaZ53vRSD7B04SGjE4ZPd9h8ZSq6MpxWsE2wo6rRHKGYl9-pU9nixtA1hd229oKpL3wKwr0_lXURjN2InBpO6sscgova9onpiCClbo-G-MrJspCKPPu6cPktV4rkkytX1Ljd1Hd4vhExlIrGtBw-Pur0CVEocWScwqL64vjI_ZX_q1o2HdYu0RH_HrP4Jijm2ROZ4UtBCK1RC1fWO6QpBpYl9b1bxQJxWUs7ykZdc1r8AZ8i90Zc0CFRNnddKGd8_Kmh3AmYQVsAOMSVx8UrdgTNQkyK1fcB5QayWkI37q-gWLEhr3E400TEJz4G2MVwtx6o06DDZE3AKZjTIkV5N5bUed2HI_B0lszYC7m-a3csAFNjIiWWABz-iU6BpE7GraPOvw0RfJa_O781JJdmDsG1woKa9-9yGhgG_1hOKIB1sYWBPWMUXKbanPrOpordWkF9_wP5BONhrqLYVVxzOXfxbWJLDPBwYmF4yi_57-O65Zpv22bRktxt_Z0x-HrLdECKWds0Idb2riWYXUrQsMn54krjI86gMeqslqkZlkab_z0EvOFUxTSMohhhZfsrUpj5xlIAsvgiRmEdz9MMIgxI-5TURR2vkYO4hwWIWIcPGbjIKMTJ-9xLAGPIEPFHtGLxLUS2M5G2OlVWr04tXDDGhOE0yWyV9ks51UTlQYcFNt0W8fFU0xwzWyJg3RdN564eRC22hSx4VSjTvWR2piZhDGNb7pQnVUmhFDQGvWOhaisJwWAFEFmCnb8CHC4Y_-Ab_kXC8vewv6XGta0E0Pnl0ASO75dUIps4sV3d2KpImGzi7R9q40-t3AiSQqUEXLf-D7oPLhl9-y9XtODq_3sKQe9Y98r0pJjc8kSV5V_d1o7S-xJIc5eaT0N2bgNeCvo-rOJG_dR0SwPtSXjKCdtGQZaBi-i9AmQaul1CB4rwrB3gFUjPvwiEr_n5gfaZO107RXh-WL8tRiPllWDlN1JZEhY1w4W-4jtr9wY9TcTWJWGWZDKIQ6PUb5jrn4bbOaYIReDC1U=UG'

let kkz_prize = 'p=a7jvhIkVyrvg=NJVCj7xpUhc89Tmu_e_xo75_bhWiKHbWiiflyFj9K9PcPG8atQjBQB2IsUA7zmuvQgqz6s3W7lO7fEmY9tcJK8H2NvCi-s4NsbaLFwQT2JkfJ2HMX68Vy0IQ9XJeXBe62hB-o5Fh35UA7rBWP5z6AYd05SatBY0GGMgLQ4iG-5auqbKGK8kXMH9lKx5VT5zSByJ3bBNeKpQtBxXShV5gtbJNISDSiC-us_DBzUemJB-EF-h9NCJqn5_YA30b_Vffz8TY_IYKPGbpkDooJFB499v1pUHMNFv8c4bXA-u1jNs0aJWfrBFkqMzFkzmj9eT9Rkv5h9a954Ps4JHINL_p0sWAlZToZtchw8_k2qiOu3BeB-yixFsLvVYnFojMHMVeDBpM5DTK31H_gVPOUpCfwueKfQuoPDlfUmHbKbnxuokMw0xKxqkOvOcQhkvvSsemccnn4zs7JYSgA0QWj3HxVrRns58qnv2c5e11jqhLRxHGKYNe5MjToe0VOPPU_DNhauWia4iXHeJmX_73g2glF0tejFbXapu79c_qOWvlQPeJ0-nZURquFrcnZhSXZdv4IbcIs7PJ4-5E7Wnz814uk-73SnqzTCLqRqHaUi4NKVHbT5wcs9Gp9Wkmxx7cj6QrZGqtsV4pFKuFtqDoA0SJttOXhQzQS_n1R0YbEclcx7wX_qmDQmsxvS9ax1ERaTr37dEymVaW9zPGZxmIWcUfXm1VZKIvBIwTkGDZnOE5puwePPJKf0mlREAnDTTIJM75L4P1PU5dsmELiX8iRGK0lpKYOorFpZrw23lvE1pEvyTBpBQl2PpAnhLu1adR8vRHnTpPb1avmUTeJZzRLLV-Wb2DadzXDB5piADv2ZAWzK6vEca2ZEs6_q78BBip3hWE5E006jWfC-8H9VqvJOWMJz_mUobloJWxviN37NYJEc8ama4Gvq4RXZYyhSugbbDED7MGACc0Sp_rSO9J4R02JzIVRV8_fjmPAP1c1qOd4SaFqmHPuO9-daCGt2G0MFHuUMwgpsK0Sr_2ztOmhNWOA3YwuHmwsWPmlQEEJzqBY_uGpiGj1tsKuDOIpoUsLpyehWd7kIIPimW-fkQp_zoCmx1HiQCfWF61eoEvkcYNVJhIPNunhFYFYxoLTrTsJam71tCFbCDdG6vRVV9HpdcFZDQ4KZ1Xv20mu4Ob8L-5WuU=U';

let sc_prize = 'p=2WRHEiWXZdUk=P3cEFJNYe4vKCJN66PNA7ILtsZkAE7I7GEud8IclEFiX2_kVM0UczinMt95JFVNwTkFbNmj8_Qj5vD0jAxL1x0VCI0AKscmYqIA8N-h4RpDVGfb2fOhqGlzmpHAGoFCpfOpJYt4n3WloJtJxeGSvHN2R0WCU2h121AKwJebGCVlrYzwnn7BEgd4zqMhBBHE2Az84wbGGjhBc57kPvT5279HSEpnS6OMeUiuxBwli3b7rHbv7XgTRXAK67cpPrpHbeQtWC2NyNKZc9jeDsccdKfEdZ0zRzSScDAF1r9Pve7b0plmBOyTt04GvjYOWCBs8k0OfC-RszqcEXexhS3OZXc1Jaf_e9LVUDjbP1BpcvvwAdMdXiS6KDSHPnZ6AdCjs5G3CwmdR0wmD2qXqr2QmklBlwoYhcIsk3naOl_qg4qh6X9exSZb9Lu09zceepXHuin6WPmF4emoctlK2AGmMr3Yn7NVEM6y9hh2VTOL47Cskuf9ma6OBQHG2eYCiDGNi6mUMAQnSbZwbEqJlno0lGlMON3Mg09yZ-OcxYsrywVlDamkfFq9cBYrAlemH6TR2KDYHeIr4ty2o0eRRNWRZCrf8e9kC1lSPlCCV1K6XIBRvDoBkmO8te1cc1MRTbn-g46fk1cd1HgL4aNqsIV6paMSUofrNt44wJkoME0T9D8FqNToY5d3_ytuwkjPZE_zOF0G_7msQbQyu47c407QjsQqLw9akyWTDoplg4bWrQuty4shtmya46-egHyYWmSYfE2VhIYHjZh7Ri5kjTTEqPn-DLhtK6zHMK6MKKAAetoeT3_LfN5tINaDmJUFyHhkwQOPUCxAYw7KtMpw1wA4oOWnHh12UUGKE0Gh_2zRtbkiD5YDk9c9_liMZbaM1wuf-SK2ZxBEmDFFdqdyXR9CO3ij1G7CzG6qgeui0KsIKyPxmd52cY18fEiln-ounyh5VKTkvzRNh_z3rd2MmvV7VOeSnf6c2OS4F69aBhvxtK9UEIe2xrIzFcPFETydN67QhlRKtNRNzSwDI0Z1oa72fnM9wnfPByFjd_ahsoWYIPixNcOvWSj97dXJ87vsdXHx2ZArI4Fxrp26LqNggm40E3X05eM39d-XRIcbG7CsnkcK-gOtYiCGb8gk7VZr8d-Iht82hRs_hUxEuhNgVnipJEefglKX-S-swbmtN33w_25nTVkSdKVi7Ew==';

let sc_prize2_token = '';

//banner_id_x 里面填入看看赚的文章body，共6个,用 & 连接。
let start_23 = '';
let banner_id_23 = '';
let banner_prize_23 ='';

let start_29 = '';
let banner_id_29 = '';
let banner_prize_29 = '';

let banner_id_42 = '';
let start_42 = '';
let banner_prize_42 = '';

let banner_id_41 = '';
let start_41 = '';
let banner_prize_41 = '';

let start_45 = '';
let banner_id_45 = '';
let banner_prize_45 = ''

let start_44 = '';
let banner_id_44 = '';
let banner_prize_44 = '';

let start_55 = '';
let banner_id_55 = '';
let banner_prize_55 = '';


let bannerStartApi = 'nameless/adlickstart.json',bsaBody = '';
let bannerReadApi = 'nameless/bannerstatus.json',braBody = '';
let bannerEndApi = 'nameless/adlickend.json',beaBody = '';

//醉卧浮生领好礼
const id23 = {"id":23,"start":start_23,"read":banner_id_23,"end":banner_prize_23}
const id29 = {"id":29,"start":start_29,"read":banner_id_29,"end":banner_prize_29}
const id42 = {"id":42,"start":start_42,"read":banner_id_42,"end":banner_prize_42}
const id41 = {"id":41,"start":start_41,"read":banner_id_41,"end":banner_prize_41}
const id45 = {"id":45,"start":start_45,"read":banner_id_45,"end":banner_prize_45}
const id44 = {"id":44,"start":start_44,"read":banner_id_44,"end":banner_prize_44}
const id55 = {"id":55,"start":start_55,"read":banner_id_55,"end":banner_prize_55}

const bannerArr = [id23,id29,id42,id41,id45,id44,id55];

let lotteryApi = 'RotaryTable/toTurnDouble.json';
let lottery_double = 'p=I1HH-fn083Io=MU9bbDOU5wV2X_CtvQk1Ix6AHkgSVSOvqUZ7bu7qE8hQCN-TkXk2yWP7mbclloe2n8pTrLRVpvFZ1jdonBgANY9RSYVffcGPHBAbXCFkXOkQb5vHFjFjTqIl3aDWiFcCcW2Gyy7XiUYTd7-J_cs7uXuDqbaJu0uuBz1UG18i-BVS59M-EIdEgY9nv2TffCLsy3HRQZVZE03q8CIZIi1oJJAL7wXUR6hPkBr21gbP9Kf5RqTcGu-57oBmlSmekiZvb4QPTaCySlIuKtxt6WQBRUZEMvoHLYhADZ6WeA7LIo5kjVuBpwa-HtqUFne0pHlVRS8X66xJzDR3SrRDwlgen6P9q98qkoeBeh8vlbmgey_ljnWzlt8DC9qIQ-gbEPViEF2OkFa20Yj7fRRcS5q9BbaH8mUMmTu-YJBIg9p2-z_XekYz77-had8CBep0DXpHOQghA_sd-1YbmjMLz760cCBkohl1KV9RnZPu5NvUMwpGuyodQ0VpfnkalR9NbYhxuHEUXmXoj6yd65XrfwfevoWw19toz5mz9472Wd5fFVDf6-cJanlXiABU1FCHt8o-wn60fj2xJyT_zXfTic9cXLuE6BluvM-hWJRMuCfg07__flKB5cy2M67MezHsKTiSMNUKxXHATB8YCEAfSLwMnjKT3U0sY1_u2C-fQwWivtgsTohclFzhvP1RfApIH9fXVOGkUqyET68_sHZqWxWR15_-OBsEx-M9sRCm54gnKlECZPiVgXVpd92M6VaXC_aVyK1w7IN0-T37dKpQgBTGjbR7hNnMvxQdqsNyHLVmlg6NwTVWKqzo4b-XBPKpcpcMtY1hmxXgdB4pk6wtujwYdYxx-jacK0PmtGaoDGuAAyY-Cys-dO1MzEvu8qk1pvDQaa0L2yZaPzRl-2lW9DGDdBo0knrWixp5JKWT-rIRXBLcQbnn4M4CFnbYKQ9y89acYyROkdmLKpjKHrn3TbreETVgs1Z62EKdZDCgxDhj-okUFuAxBqd722UriL9YBF3cpR3a06RsI-nR7Wk3OIdApdcChTd2qcF1dv4AyJx8ngpxdAIETY6FJuHtQr4z4MCydmNAypFIeQcnWB0sCMEJoE6KrX4eh5qINPsUEVqWEnQ=';

!(async () => {
	if (hour == 0 && minute < 30) {
		await do_login();
	}
	if (minute < 30) {
		await do_syhb(); //首页红包common，每小时一次
		await $.wait(1000)
	}
	if ((hour == 8) || (hour == 10) || (hour == 12) || (hour == 14)){
		await do_sysp(); //首页看视频领金币，每天6次
	}
	if (hour == 9 && minute < 30) {
		await do_sc_prize2()
	}
	await $.wait(1000)	
	await do_tasklist();
	await $.wait(1000)
	if ((hour == 13) || (hour == 14) || (hour == 15) || (hour == 16) || (hour == 17)) {
		for (let n = 0; n < 10; n++) {
			await do_lottery()
			await $.wait(3000)
		}
	}
	await do_userdata();
	//await do_sign(); //签到
	//await do_sdjl(); //时段幸运奖励
	//await do_sdhb(); //计时红包，时段红包
	//await do_sc(); //刷时长
	//await do_flsp() //看福利视频
	//await read_prize(); //领取阅读额外奖励
	//await video_prize(); //领取视频额外奖励
	//await flvideo_prize(); //领取福利视频奖励
	//await do_share_prize(); //领取分享奖励
	//await do_kkz_prize(); //领取完成6次看看赚的奖励
	//await do_sc_prize(); //领取时长奖励
	//await do_prize3(); //领取完成3个任务奖励
	//await do_prize6(); //领取完成6个任务奖励
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

 //tasklist
 function do_tasklist() {
  return new Promise(resolve => {
    $.get(tasklist(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(unescape(data));
			//console.log(`tasklist：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n获取日常任务列表成功，开始检测任务状态 --- `)
				box = result.items.box
				if (box.three.status == 1) {
					await do_prize3();
				} else if (box.six.status == 1) {
					await do_prize6();
				}
				bubble = result.items.bubble
				//console.log(`bubble：${JSON.stringify(bubble)}`)
				for (let n = 0; n < bubble.length; n++) {
					if (bubble[n].sort == 1 && bubble[n].count_down == 0) {
						await do_sdjl(); //时段幸运奖励
						} else if (bubble[n].sort == 2 && bubble[n].count_down == 0) {
							await do_sdhb(); //计时红包,时段红包
						} else if (bubble[n].sort == 3 && bubble[n].count_down == 0) {
							//console.log(`\n${bubble[n].task_name} 数据还没有获取，请去获取！`)
							await do_HourRed();
						}
				}
				daily = result.items.daily
				//console.log(daily)
				for (let m = 0;m < daily.length; m++){
					$.title = daily[m].title
					if(daily[m].status == 2){
						console.log(`\n任务 ${$.title} ${daily[m].but}！`)
					} else if (daily[m].status == 0){
						console.log(`\n任务 ${$.title} 未完成，去执行任务 ---`)
						//banner阅读5个
						for (let s = 0;s < bannerArr.length; s++) {
							$.id = bannerArr[s].id
							$.sbody = bannerArr[s].start
							$.rbody = bannerArr[s].read
							$.ebody = bannerArr[s].end
							if ($.id == daily[m].banner_id) {
								bsaBody = $.sbody
								await bannerStart();
								braBody_1 = $.rbody
								braBody = braBody_1.split("&")
								console.log(`开始执行浏览 ${$.title} ---`)
								for (let n = 0; n < braBody.length; n++) {
									await $.wait(10000)
									await bannerRead();
								}
								beaBody = $.ebody
								await bannerEnd()
							}
						}
						if ($.title === `阅读60分钟`) {
							for (let n = 0; n < 3; n++){
								await do_sc();
								await $.wait(60000)
							}
						}
						if ($.title === `看福利视频`) {
							await do_flsp();
						}
						if ($.title === `转发文章`) {
							await do_fx();
						}
					} else if (daily[m].status == 1){
						console.log(`\n任务 ${$.title} 已完成，去领取奖励 ---`)
						if ($.title === `阅读60分钟`) {
							await do_sc_prize();
						}
						if ($.title === `看福利视频`) {
							await flvideo_prize();
						}
						if ($.title === `阅读文章`) {
							await read_prize();
						}
						if ($.title === `观看视频`) {
							await video_prize();
						}
						if ($.title === `看看赚`) {
							await do_kkz_prize();
						}
						if ($.title === `转发文章`) {
							await do_share_prize();
						}
					}
				}
			} else {
				console.log(`签获取任务列表失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //userdata
function do_userdata() {
  return new Promise(resolve => {
    $.get(userdata(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(unescape(data));
			//console.log(`userdata：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`==========================`)
				console.log(`用户名：${result.items.nickname} \n邀请码：${result.items.invite_code}`)
				console.log(`金币总数：${result.items.score} \n账户状态：${result.items.user_status}`)
				if (result.items.score > 300000) {
					//await do_withdraw()
				}
				console.log(`今日获得金币：${result.items.today_score} \n明日签到金币：${result.items.sign_reward_score}`)
				if (result.items.sign_status == 0) {
					console.log(`今日签到状态：未签到。去执行签到 ---`)
					await do_sign();
				} else if (result.items.sign_status == 1) {
					console.log(`今日签到状态：已签到`)
				}
				if (result.items.msg_notice.is_login == "1") {
					console.log(`登入状态：已登入`)
				} else if (result.items.msg_notice.is_login == "0") {
					console.log(`登入状态：未登入，请重新登入`)
				}
				console.log(`账户余额：${result.items.money_str}`)
			} else {
				console.log(`个人信息获取失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//login
function do_login() {
  return new Promise(resolve => {
    $.post(login(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`登入结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n登入成功！`)
			} else {
				console.log(`\n登入失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//签到
function do_sign() {
  return new Promise(resolve => {
    $.post(basic(basicApi,signBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`签到结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`签到成功，获得 ${result.items.score} 金币！`)
				console.log(`开始执行 ${result.items.button.title} ---`)
				await $.wait(30000);
				await do_sign2();
          } else {
			  console.log(`今日已签到:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

 //签到翻倍
 function do_sign2() {
  return new Promise(resolve => {
    $.post(basic(doubleSignApi,doubleSignBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`签到翻倍结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`签到翻倍成功，获得 ${result.items.score} 金币！ `)
			} else {
				console.log(`签到翻倍失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //时段奖励，每10分钟一次，限6次。
 function do_sdjl() {
  return new Promise(resolve => {
    $.post(basic(basicApi,sdBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`时段奖励成功，获得 ${result.items.score} 金币！ `)
			} else {
				console.log(`时段奖励失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //刷时长
 function do_sc() {
  return new Promise(resolve => {
    $.post(basic(scApi,scBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`刷时长结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`刷入时长成功！`)
			} else {
				console.log(`刷入时长失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //分享
 function do_fx() {
  return new Promise(resolve => {
    $.post(fx(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`分享结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`分享1次成功！`)
			} else {
				console.log(`分享失败:${JSON.stringify(result.message)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //时段红包，每30分钟一次。
 function do_sdhb() {
  return new Promise(resolve => {
    $.post(sdhb(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段红包结果：${JSON.stringify(result)}\n`)
			if (result.code == 1) {
				console.log(`\n时段红包领取成功，获得 ${result.data.score} 金币！`)
			} else {
				console.log(`\n时段红包领取失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //每小时开宝箱。
 function do_HourRed() {
  return new Promise(resolve => {
    $.post(HourRed(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`开宝箱结果：${JSON.stringify(result)}\n`)
			if (result.code == 1) {
				console.log(`\n开宝箱成功，获得 ${result.data.score} 金币！`)
			} else {
				console.log(`\n开宝箱失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//领取首页红包
function do_syhb() {
  return new Promise(resolve => {
    $.post(basic(basicApi,syhb_common), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取首页红包结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n领取首页红包成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`\n领取首页红包失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

 //首页时段视频奖励，每天6次
 function do_sysp() {
  return new Promise(resolve => {
    $.post(sysp(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段红包结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n首页时段激励奖励获取成功，获得 ${result.items.dialog.score} 金币！`)
			} else {
				console.log(`\n首页时段激励奖励获取失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//领取额外阅读奖励
function read_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,read20_Prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取阅读奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取阅读奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取阅读奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取分享奖励
function do_share_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,share_prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取分享奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取分享奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取分享奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取完成看看赚6次奖励
function do_kkz_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,kkz_prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取看看赚奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取看看赚奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取看看赚奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取5分钟时长奖励
function do_sc_prize2() {
  return new Promise(resolve => {
    let options = {
		url: `https://ant.xunsl.com/v17/Ad/getReward.json`,
		headers: {
			'Token': sc_prize2_token,
			'Content-Type': `application/x-www-form-urlencoded`,
			'Host': `ant.xunsl.com`,
			'Connection': `Keep-Alive`,
			'Accept-Encoding': `gzip`,
			'User-Agent': `okhttp/3.12.2`
		},
		body: ``
	};
	$.post(options, async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取5分钟时长奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取5分钟时长奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取5分钟时长奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取60分钟时长奖励
function do_sc_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,sc_prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取60分钟时长奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取60分钟时长奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取60分钟时长奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取额外视频奖励
function video_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,video10_Prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取额外视频奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取额外视频奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取额外视频奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取福利视频奖励
function flvideo_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,flsp_Prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取额外视频奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取福利视频奖励成功，获得 ${result.items.score} 金币！\n`)
          } else {
			  console.log(`领取福利视频奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//完成3个任务奖励
function do_prize3() {
  return new Promise(resolve => {
    $.post(basic(basicApi,prize3_body), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取 完成3个任务奖励 结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取 完成3个任务奖励 成功，获得 ${result.items.score} 金币！\n`)
          } else {
			  console.log(`领取 完成3个任务奖励 失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//完成6个任务奖励
function do_prize6() {
  return new Promise(resolve => {
    $.post(basic(basicApi,prize6_body), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取 完成6个任务奖励 结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取 完成6个任务奖励 成功，获得 ${result.items.score} 金币！\n`)
          } else {
			  console.log(`领取 完成6个任务奖励 失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//看福利视频，每天5次
function do_flsp() {
  return new Promise(resolve => {
    $.get(flsp(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`看福利视频结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`看福利视频成功！`)
          } else {
			  console.log(`看福利视频失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//bannerStart
function bannerStart() {
  return new Promise(resolve => {
    $.post(basic(bannerStartApi,bsaBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`bannerStart：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`激活 ${$.title} 成功，开始浏览 ---`)
				console.log(`开始浏览 ---`)
          } else {
			  console.log(`激活 ${$.title} 失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//bannerRead
function bannerRead() {
  return new Promise(resolve => {
    $.post(basic(bannerReadApi,braBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`bannerRead：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`完成浏览 ${$.title} 1次`)
				//await bannerEnd()
          } else {
			  console.log(`浏览 ${$.title} 失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//bannerEnd
function bannerEnd() {
  return new Promise(resolve => {
    $.post(basic(bannerEndApi,beaBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`bannerEnd：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`浏览 ${$.title} 完成，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取 ${$.title} 奖励失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//抽奖
function do_lottery() {
  return new Promise(resolve => {
    $.post(lottery(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`抽奖结果：${JSON.stringify(result)}\n`)
			if (result.status == 1 && result.data.score > 0) {
				console.log(`\n抽奖成功，获得 ${result.data.score} 金币！`)
				console.log(`剩余可抽奖次数：${result.data.remainTurn} 次`)
			} else if (result.status == 1 && result.data.score == 0){
			  console.log(`\n抽奖失败,获得 ${result.data.score} 金币！`)
			  console.log(`剩余可抽奖次数：${result.data.remainTurn} 次`)
			} else {
				console.log(`\n抽奖失败：${JSON.stringify(result)}`)
			}
			if (result.status == 1 && result.data.score > 0 && result.data.doubleMultiple > 0) {
				console.log(`等待28秒开始抽奖翻倍 ---`)
				await $.wait(28300)
				await do_lottery2()
			}
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//抽奖翻倍
function do_lottery2() {
  return new Promise(resolve => {
    $.post(basic(lotteryApi,lottery_double), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`抽奖翻倍结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`抽奖翻倍成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`抽奖翻倍失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//basic
function basic(api,body) {
  return {
    url: `https://ant.xunsl.com/v5/`+api,
    headers: {
		'request_time': TS,
		'access': `WIFI`,
		'device-platform': `android`,
		'app-version': `8.1.2`,
		'Content-Type': `application/x-www-form-urlencoded`,
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	},
    body: body
  }
}

//share
function fx() {
  return {
    url: `https://ant.xunsl.com/v6/article/share/put.json`,
    headers: {
		'Token': ``,
		'Content-Type': `application/x-www-form-urlencoded`,
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	},
    body: ``
  }
}

//时段红包
function sdhb() {
  return {
    url: `https://ant.xunsl.com/WebApi/TimePacket/getReward`,
    headers: {
      'Referer': 'https://ant.xunsl.com/h5/20200612makeMoney/?access=4G&app-version=8.3.2&app_type=jckd&app_version=8.3.2&carrier=%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1&channel=c1005&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdjW6FooabrqmiapqGcXY&cookie_id=57782dceeac7b9bf1b6bec24a730ce00&device_brand=SMARTISAN&device_id=6f9c21802e9e7d69&device_model=SM919&device_platform=android&device_type=android&inner_version=202109031457&mi=0&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&phone_network=4G&phone_sim=1&request_time=1636964935&resolution=1440x2560&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&subv=1.2.2&time=1636964935&uid=55242014&uuid=a22b385d22664feb807ee85febb9ba55&version_code=832&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdjW6FooabrqmiapqGcXY&zqkey_id=57782dceeac7b9bf1b6bec24a730ce00'
	},
    body: ``
  }
}

//每小时开宝箱
function HourRed() {
  return {
    url: `https://ant.xunsl.com/WebApi/invite/openHourRed`,
    headers: {
      'Referer': 'http://ant.xunsl.com/h5/20190410invitefriend/?antaccess=4G&app-version=8.3.2&app_type=jckd&app_version=8.3.2&carrier=CHN-CT&channel=c1005&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjHrer7m6apqGcXY&cookie_id=1151e6340221527ef9fd47ec22857953&device_brand=SMARTISAN&device_id=6f9c21802e9e7d69&device_model=SM919&device_platform=android&device_type=android&inner_version=202109031457&mi=0&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T+release-keys&phone_network=4G&phone_sim=1&request_time=1634451167&resolution=1440x2560&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&subv=1.2.2&time=1634451167&uid=55242014&uuid=a22b385d22664feb807ee85febb9ba55&version_code=832&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjHrer7m6apqGcXY&zqkey_id=1151e6340221527ef9fd47ec22857953'
	},
    body: ``
  }
}

//看福利视频
function flsp() {
  return {
    url: `https://ant.xunsl.com/V17/NewTask/recordNum.json?access=4G&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&carrier=CHN-CT&channel=c1005&device_brand=SMARTISAN&device_id=52000271&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202109031457&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1634456085&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=YqH-4Ui0XDPM%3D-yejl_NzfE3xzcVsKpbG0YtwlHf84UOh&s_im=wqH-4Ui0XDPM%3D5QxbWsWPwA5_abFU5rKt5A%3D%3D&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&uid=55242014&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjI7drqnEapqGcXY&zqkey_id=924dddfd098d6b2d0e56bf233df98d8a&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFwcC12ZXJzaW9uIjoiOC4zLjIiLCJhcHBfbmFtZSI6Impja2RfYXBwIiwiYXBwX3ZlcnNpb24iOiI4LjMuMiIsImNhcnJpZXIiOiJDSE4tQ1QiLCJjaGFubmVsIjoiYzEwMDUiLCJkZXZpY2VfYnJhbmQiOiJTTUFSVElTQU4iLCJkZXZpY2VfaWQiOiI1MjAwMDI3MSIsImRldmljZV9tb2RlbCI6IlNNOTE5IiwiZGV2aWNlX3BsYXRmb3JtIjoiYW5kcm9pZCIsImRldmljZV90eXBlIjoiYW5kcm9pZCIsImRwaSI6IjU2MCIsImlubmVyX3ZlcnNpb24iOiIyMDIxMDkwMzE0NTciLCJsYW5ndWFnZSI6InpoLUNOIiwibWVtb3J5IjoiNSIsIm1pIjoiMCIsIm1vYmlsZV90eXBlIjoiMSIsIm5ldF90eXBlIjoiMiIsIm5ldHdvcmtfdHlwZSI6IjRHIiwib3BlbnVkaWQiOiI2ZjljMjE4MDJlOWU3ZDY5Iiwib3NfYXBpIjoiMjMiLCJvc192ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInJlcXVlc3RfdGltZSI6IjE2MzQ0NTYwODUiLCJyZXNvbHV0aW9uIjoiMTQ0MHgyNTYwIiwicm9tX3ZlcnNpb24iOiJNWEI0OFQrcmVsZWFzZS1rZXlzIiwic19hZCI6IllxSC00VWkwWERQTSUzRC15ZWpsX056ZkUzeHpjVnNLcGJHMFl0d2xIZjg0VU9oIiwic19pbSI6IndxSC00VWkwWERQTSUzRDVReGJXc1dQd0E1X2FiRlU1ckt0NUElM0QlM0QiLCJzaW0iOiIxIiwic21fZGV2aWNlX2lkIjoiMjAyMTA5MjkxNjA1Mjc3Y2QyZTM1Yzc5MTFiY2JiM2YzMGEwZmVjYzI4YTEyYjAxYjIwYjgzMWEyMTk3NDQiLCJzdG9yYWdlIjoiNTIuNjIiLCJzdWJ2IjoiMS4yLjIiLCJ1aWQiOiI1NTI0MjAxNCIsInZlcnNpb25fY29kZSI6IjgzMiIsInpxa2V5IjoiTURBd01EQXdNREF3TUpDTXBOLXcwOVd0ZzUtQmIzNmVoNkNQcUh1YWxJZWpsNi1GcldLd3pYV3hoWHlwNExEUHlHbDlvbnFrajNacVlKYThZODk4bmFqV3NKdXBaTERkaFdtRmpJN2RycW5FYXBxR2NYWSIsInpxa2V5X2lkIjoiOTI0ZGRkZmQwOThkNmIyZDBlNTZiZjIzM2RmOThkOGEifQ.BwLR5CQmt1d_ywwf6EcPx8aAv6E1yAEMJVvU99E14UjU0qRshggc4z40LYWD4KIZc5cVrST61iRYLOeTA8FqYw`,
    headers: {

	}
  }
}

//首页视频奖励
function sysp() {
  return {
    url: `https://ant.xunsl.com/v17/Rvideo/videoCallback.json`,
    headers: {

	},
    body: `access=4G&action=right_corner_video&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&carrier=CHN-CT&channel=c1005&device_brand=SMARTISAN&device_id=52000271&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202109031457&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1634452196&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=C7jvhIkVyrvg%3D-yk38pmM3JKhxvg4BmiQt9uAQgo9HJJXY&s_im=vCWzFwAroTSg%3Dm5oHIteOrCfqCdfjBg8NkQ%3D%3DU5&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFjdGlvbiI6InJpZ2h0X2Nvcm5lcl92aWRlbyIsImFwcC12ZXJzaW9uIjoiOC4zLjIiLCJhcHBfbmFtZSI6Impja2RfYXBwIiwiYXBwX3ZlcnNpb24iOiI4LjMuMiIsImNhcnJpZXIiOiJDSE4tQ1QiLCJjaGFubmVsIjoiYzEwMDUiLCJkZXZpY2VfYnJhbmQiOiJTTUFSVElTQU4iLCJkZXZpY2VfaWQiOiI1MjAwMDI3MSIsImRldmljZV9tb2RlbCI6IlNNOTE5IiwiZGV2aWNlX3BsYXRmb3JtIjoiYW5kcm9pZCIsImRldmljZV90eXBlIjoiYW5kcm9pZCIsImRwaSI6IjU2MCIsImlubmVyX3ZlcnNpb24iOiIyMDIxMDkwMzE0NTciLCJsYW5ndWFnZSI6InpoLUNOIiwibWVtb3J5IjoiNSIsIm1pIjoiMCIsIm1vYmlsZV90eXBlIjoiMSIsIm5ldF90eXBlIjoiMiIsIm5ldHdvcmtfdHlwZSI6IjRHIiwib3BlbnVkaWQiOiI2ZjljMjE4MDJlOWU3ZDY5Iiwib3NfYXBpIjoiMjMiLCJvc192ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInJlcXVlc3RfdGltZSI6IjE2MzQ0NTIxOTYiLCJyZXNvbHV0aW9uIjoiMTQ0MHgyNTYwIiwicm9tX3ZlcnNpb24iOiJNWEI0OFQrcmVsZWFzZS1rZXlzIiwic19hZCI6IkM3anZoSWtWeXJ2ZyUzRC15azM4cG1NM0pLaHh2ZzRCbWlRdDl1QVFnbzlISkpYWSIsInNfaW0iOiJ2Q1d6RndBcm9UU2clM0RtNW9ISXRlT3JDZnFDZGZqQmc4TmtRJTNEJTNEVTUiLCJzaW0iOiIxIiwic21fZGV2aWNlX2lkIjoiMjAyMTA5MjkxNjA1Mjc3Y2QyZTM1Yzc5MTFiY2JiM2YzMGEwZmVjYzI4YTEyYjAxYjIwYjgzMWEyMTk3NDQiLCJzdG9yYWdlIjoiNTIuNjIiLCJzdWJ2IjoiMS4yLjIiLCJ1aWQiOiI1NTI0MjAxNCIsInZlcnNpb25fY29kZSI6IjgzMiIsInpxa2V5IjoiTURBd01EQXdNREF3TUpDTXBOLXcwOVd0ZzUtQmIzNmVoNkNQcUh1YWxJZWpsNi1GcldLd3pYV3hoWHlwNExEUHlHbDlvbnFrajNacVlKYThZODk4bmFqV3NKdXBaTERkaFdtRmpIN2Vycm02YXBxR2NYWSIsInpxa2V5X2lkIjoiZWFiOWU0MmI4NjU0NTYwOGFmNzAzMGJlYjkxZWEwNjkifQ.puiVKRhVCi5AS1lV87E-bzbdfm6ZUFiWMng2rgCi4ErtSW4v3_zybyjLCoSryIhJZJns62pz-Wvb-OBmkEFdkw&uid=55242014&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjH7errm6apqGcXY&zqkey_id=eab9e42b86545608af7030beb91ea069`
  }
}

//tasklist
function tasklist() {
  return {
    url: `https://ant.xunsl.com/v17/NewTask/getTaskList.json?access=4G&action=right_corner_video&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&carrier=CHN-CT&channel=c1005&device_brand=SMARTISAN&device_id=52000271&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202109031457&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1634452196&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=C7jvhIkVyrvg%3D-yk38pmM3JKhxvg4BmiQt9uAQgo9HJJXY&s_im=vCWzFwAroTSg%3Dm5oHIteOrCfqCdfjBg8NkQ%3D%3DU5&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFjdGlvbiI6InJpZ2h0X2Nvcm5lcl92aWRlbyIsImFwcC12ZXJzaW9uIjoiOC4zLjIiLCJhcHBfbmFtZSI6Impja2RfYXBwIiwiYXBwX3ZlcnNpb24iOiI4LjMuMiIsImNhcnJpZXIiOiJDSE4tQ1QiLCJjaGFubmVsIjoiYzEwMDUiLCJkZXZpY2VfYnJhbmQiOiJTTUFSVElTQU4iLCJkZXZpY2VfaWQiOiI1MjAwMDI3MSIsImRldmljZV9tb2RlbCI6IlNNOTE5IiwiZGV2aWNlX3BsYXRmb3JtIjoiYW5kcm9pZCIsImRldmljZV90eXBlIjoiYW5kcm9pZCIsImRwaSI6IjU2MCIsImlubmVyX3ZlcnNpb24iOiIyMDIxMDkwMzE0NTciLCJsYW5ndWFnZSI6InpoLUNOIiwibWVtb3J5IjoiNSIsIm1pIjoiMCIsIm1vYmlsZV90eXBlIjoiMSIsIm5ldF90eXBlIjoiMiIsIm5ldHdvcmtfdHlwZSI6IjRHIiwib3BlbnVkaWQiOiI2ZjljMjE4MDJlOWU3ZDY5Iiwib3NfYXBpIjoiMjMiLCJvc192ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInJlcXVlc3RfdGltZSI6IjE2MzQ0NTIxOTYiLCJyZXNvbHV0aW9uIjoiMTQ0MHgyNTYwIiwicm9tX3ZlcnNpb24iOiJNWEI0OFQrcmVsZWFzZS1rZXlzIiwic19hZCI6IkM3anZoSWtWeXJ2ZyUzRC15azM4cG1NM0pLaHh2ZzRCbWlRdDl1QVFnbzlISkpYWSIsInNfaW0iOiJ2Q1d6RndBcm9UU2clM0RtNW9ISXRlT3JDZnFDZGZqQmc4TmtRJTNEJTNEVTUiLCJzaW0iOiIxIiwic21fZGV2aWNlX2lkIjoiMjAyMTA5MjkxNjA1Mjc3Y2QyZTM1Yzc5MTFiY2JiM2YzMGEwZmVjYzI4YTEyYjAxYjIwYjgzMWEyMTk3NDQiLCJzdG9yYWdlIjoiNTIuNjIiLCJzdWJ2IjoiMS4yLjIiLCJ1aWQiOiI1NTI0MjAxNCIsInZlcnNpb25fY29kZSI6IjgzMiIsInpxa2V5IjoiTURBd01EQXdNREF3TUpDTXBOLXcwOVd0ZzUtQmIzNmVoNkNQcUh1YWxJZWpsNi1GcldLd3pYV3hoWHlwNExEUHlHbDlvbnFrajNacVlKYThZODk4bmFqV3NKdXBaTERkaFdtRmpIN2Vycm02YXBxR2NYWSIsInpxa2V5X2lkIjoiZWFiOWU0MmI4NjU0NTYwOGFmNzAzMGJlYjkxZWEwNjkifQ.puiVKRhVCi5AS1lV87E-bzbdfm6ZUFiWMng2rgCi4ErtSW4v3_zybyjLCoSryIhJZJns62pz-Wvb-OBmkEFdkw&uid=55242014&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjH7errm6apqGcXY&zqkey_id=eab9e42b86545608af7030beb91ea069`,
	headers: {
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	}
  }
}

//start
function login() {
  return {
    url: `https://ant.xunsl.com/v6/count/start.json`,
    headers: {

	},
	body: `access=4G&androidid=6f9c21802e9e7d69&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&carrier=CHN-CT&channel=c1005&device_brand=SMARTISAN&device_id=52000271&device_model=SM919&device_platform=android&device_type=android&dpi=560&imei=99000718286309&inner_version=202109031457&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1634451148&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=R4W7v2WlUNXk%3DD0kfJWWF3a-utREeAbpl72B8Y_DqVDqGVp&s_im=lCWzFwAroTSg%3Dm5oHIteOrCfqCdfjBg8NkQ%3D%3DRC&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&token=8728b2d45bdd59204dc483626033af47&uid=55242014&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFfJiYrt_IapqGcXY&zqkey_id=e849c62a07d9c699c046450a8900c07e`
  }
}


//userdata
function userdata() {
  return {
    url: `https://ant.xunsl.com/v3/user/userinfo.json?access=4G&app_name=jckd_app&app_version=8.3.2&carrier=CHN-CT&channel=c1005&device_brand=SMARTISAN&device_id=52000271&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202109031457&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&phone_sim=1&request_time=1634451147&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=q1HH-fn083Io%3DPIZFELfQKTV86YrplF2P3jbrlBo00hlo&s_im=51HH-fn083Io%3DPAFdVtoudqBOxlZII9SSGA%3D%3D&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&uid=55242014&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFfJiYrt_IapqGcXY&zqkey_id=e849c62a07d9c699c046450a8900c07e&sign=01154c046532a3a86fa7d33cf7466f00`,
    headers: {
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	}
  }
}

//抽奖
function lottery() {
  return {
    url: `https://ant.xunsl.com/WebApi/RotaryTable/turnRotary?_=${TS}`,
    headers: {
      "Referer": `https://ant.xunsl.com/html/rotaryTable/index.html?keyword_wyq=woyaoq.com&access=4G&app-version=8.3.2&app_type=jckd&app_version=8.3.2&carrier=CHN-CT&channel=c1005&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjI6Yr7mqapqGcXY&cookie_id=5c90b1d5b7bbc379d009894a619964f0&device_brand=SMARTISAN&device_id=6f9c21802e9e7d69&device_model=SM919&device_platform=android&device_type=android&inner_version=202109031457&mi=0&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T+release-keys&phone_network=4G&phone_sim=1&request_time=1634456684&resolution=1440x2560&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&subv=1.2.2&time=1634456684&uid=55242014&uuid=a22b385d22664feb807ee85febb9ba55&version_code=832&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhWmFjI6Yr7mqapqGcXY&zqkey_id=5c90b1d5b7bbc379d009894a619964f0`
	},
    body: ``
  }
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            }
                : t;
            let s = this.get;
            return "POST" === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s)
                    })
                })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t,
                this.http = new s(this),
                this.data = null,
                this.dataFile = "box.dat",
                this.logs = [],
                this.isMute = !1,
                this.isNeedRewrite = !1,
                this.logSeparator = "\n",
                this.startTime = (new Date).getTime(),
                Object.assign(this, e),
                this.log(`\n${this.name}\u811a\u672c,\u5f00\u59cb\u6267\u884c:`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t))
                } catch { }
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20,
                    r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"),
                    a = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: "cron",
                            timeout: r
                        },
                        headers: {
                            "X-Key": o,
                            Accept: "*/*"
                        }
                    };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode())
                return {}; {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i)
                    return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r)
                    return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            } else
                s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"),
                this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
                this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
                t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => { })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.get(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                        e(t, s, i)
                })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            this.ckjar.setCookieSync(s, null),
                                e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
        }
        post(t, e = (() => { })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
                this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.post(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                        e(t, s, i)
                });
            else if (this.isQuanX())
                t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n")),
                this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}\u811a\u672c, \u6267\u884c\u7ed3\u675f! \u7528\u65f6${s}\u79d2`),
                this.log(),
                (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }
        (t, e)
}

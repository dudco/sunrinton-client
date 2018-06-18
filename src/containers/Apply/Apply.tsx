import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import { Redirect } from 'react-router';
import { MoonLoader } from 'react-spinners';

import * as classNames from 'classnames/bind';
import * as styles from './Apply.less';
const cx = classNames.bind(styles);

// export interface ApplyProps {
// }
const Loading = props => (
  <div style={{ width: '100%', height: '100%', display: 'flex', position: 'fixed', justifyContent: 'center', alignItems: 'center', top: 0, left: 0, backgroundColor: "#00000033", zIndex: 100}}>
    <MoonLoader
      color={'#642c8f'}
    />
  </div>
);

export interface ApplyState {
  name: string;
  gender: string;
  phone: string;
  sID: string;
  team: string;
  role: string;
  type: string;
  project: string;
  portpolio: File;
  size: string;

  redirect: string;
  loading: boolean;
}

export default class Apply extends React.Component<{}, ApplyState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      phone: "",
      sID: "",
      team: "",
      role: "",
      type: "",
      project: "",
      portpolio: null,
      size: "",

      redirect: "",
      loading: false,
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onKeyDownPhone = this.onKeyDownPhone.bind(this);
    this.onChangeSID = this.onChangeSID.bind(this);
    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangePortPolio = this.onChangePortPolio.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);

    this.onClickConfirm = this.onClickConfirm.bind(this);
  }

  public render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className={styles.idx}>
        <div>
        {this.state.loading && <Loading />}
          <div className={styles.container}>
            <span><span>제</span><span>4</span><span>회</span></span>
            <span>선린해커톤 참가신청서</span>
            <span>참가자가 많을 시 제출한 포트폴리오와 프로젝트 경력을 통해 심사합니다.</span>

            <div>
              {/* 이름 */}
              <div>
                <span>이름</span>
                <div>
                  <input type="text" placeholder="이름을 입력해 주세요." onChange={this.onChangeName} tabIndex={1} />
                  <div>
                    <button onClick={this.onChangeGender} className={cx({ checked: this.state.gender === "남" })}>남</button>
                    <button onClick={this.onChangeGender} className={cx({ checked: this.state.gender === "여" })}>여</button>
                  </div>
                </div>
              </div>
              {/* 연락처 */}
              <div>
                <span>연락처</span>
                <div>
                  <input
                    type="text"
                    placeholder="ex) 010-2254-2776"
                    onChange={this.onChangePhone}
                    maxLength={13}
                    tabIndex={2}
                    value={this.state.phone}
                    onKeyDown={this.onKeyDownPhone}
                  />
                </div>
              </div>
              {/* 학번 */}
              <div>
                <span>학번</span>
                <div>
                  <input type="text" placeholder="31104" onChange={this.onChangeSID} maxLength={5} tabIndex={3} />
                </div>
              </div>
              {/* 팀명 */}
              <div>
                <span>팀명</span>
                <div>
                  <input type="text" placeholder="10글자이내로 입력해주세요." onChange={this.onChangeTeam} maxLength={10} tabIndex={4} />
                </div>
              </div>
              {/* 직군 */}
              <div>
                <span>직군</span>
                <div>
                  <button onClick={this.onChangeRole} className={cx({ checked: this.state.role === "팀장" })}>팀장</button>
                  <button onClick={this.onChangeRole} className={cx({ checked: this.state.role === "개발" })}>개발</button>
                  <button onClick={this.onChangeRole} className={cx({ checked: this.state.role === "디자인" })}>디자인</button>
                </div>
              </div>
              {/* 분야 */}
              <div>
                <span>분야</span>
                <div>
                  <button onClick={this.onChangeType} className={cx({ checked: this.state.type === "생활" })}>생활</button>
                  <button onClick={this.onChangeType} className={cx({ checked: this.state.type === "게임" })}>게임</button>
                </div>
              </div>
              {/* 포트폴리오 */}
              <div>
                <span>포트폴리오</span>
                <input type="file" id="portfolio" onChange={this.onChangePortPolio} />
                <label htmlFor="portfolio">파일선택</label>
                <span>{this.state.portpolio ? this.state.portpolio.name : "20MB 이내로 첨부해주세요 (선택)"}</span>
              </div>
              {/* 프로젝트 */}
              <div>
                <span>프로젝트</span>
                <textarea placeholder="참여했던 프로젝트 등을 설명해주세요. (500자 이내)" maxLength={500} onChange={this.onChangeProject} tabIndex={5} />
              </div>
              {/* 사이즈 */}
              <div>
                <span>사이즈</span>
                <div>
                  <button onClick={this.onChangeSize} className={cx({ checked: this.state.size === "S" })}>S</button>
                  <button onClick={this.onChangeSize} className={cx({ checked: this.state.size === "M" })}>M</button>
                  <button onClick={this.onChangeSize} className={cx({ checked: this.state.size === "L" })}>L</button>
                  <button onClick={this.onChangeSize} className={cx({ checked: this.state.size === "XL" })}>XL</button>
                  <button onClick={this.onChangeSize} className={cx({ checked: this.state.size === "2XL" })}>2XL</button>
                </div>
              </div>

              <div>
                <button className={styles.checked} onClick={this.onClickConfirm}>신청하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onClickConfirm() {
    if (this.state.name === "") {
      alert("이름을 입력해주세요")
    } else if (this.state.gender === "") {
      alert("'남/여'를 선택해주세요")
    } else if (this.state.phone === "") {
      alert("전화번호를 입력해주세요")
    } else if (this.state.sID === "") {
      alert("학번을 입력해주세요")
    } else if (this.state.team === "") {
      alert("팀명을 입력해주세요")
    } else if (this.state.role === "") {
      alert("직군을 선택해주세요")
    } else if (this.state.type === "") {
      alert("참여분야를 선택해주세요")
    } else if (this.state.size === "") {
      alert("티셔츠 사이즈를 선택해주세요")
    } else {
      this.setState({ loading: true });
      const form = new FormData();
      const state = this.state;
      form.append("team", state.team);
      form.append("name", state.name);
      form.append("gender", state.gender);
      form.append("phone", state.phone);
      form.append("portpolio", state.portpolio);
      form.append("project", state.project);
      form.append("role", state.role);
      form.append("sID", state.sID);
      form.append("size", state.size);
      form.append("type", state.type);
      axios.post('/api/apply', form).then((res: AxiosResponse) => {
        this.setState({loading: false});
        if (res.status === 200) {
          alert(`${state.name}님 신청해주세서 감사합니다 ^~^`);
          this.setState({redirect: "/"});
        } else {
          alert(`이미 제출하셨습니다. 수정을 원하시면 페이지로 문의 부탁드립니다.`);
        }
      })
    }
  }

  private onChangeName(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ name: e.currentTarget.value })
  }
  private onChangePhone(e: React.FormEvent<HTMLInputElement>) {
    const inputber = e.currentTarget.value;
    let newInput: string = " ";
    newInput = inputber;
    if (newInput.length === 3) {
      newInput += '-';
    }
    if (newInput.length === 8) {
      newInput += '-';
    }
    this.setState({ phone: newInput })
  }
  private onKeyDownPhone(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 8 && (this.state.phone.length === 4 || this.state.phone.length === 9)) {
      this.setState({ phone: this.state.phone.substring(0, this.state.phone.length - 1) })
    }
  }

  private onChangeTeam(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ team: e.currentTarget.value })
  }
  private onChangeSID(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ sID: e.currentTarget.value })
  }
  private onChangeProject(e: React.FormEvent<HTMLTextAreaElement>) {
    this.setState({ project: e.currentTarget.value })
  }
  private onChangePortPolio(e: React.FormEvent<HTMLInputElement>) {
    const file = e.currentTarget.files[0];

    if (file != null) {
      if (file.size > 20971520) {
        alert('20MB초과')
      } else {
        this.setState({ portpolio: e.currentTarget.files[0] });
      }
    }
  }
  private onChangeGender(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({ gender: e.currentTarget.innerText })
  }
  private onChangeRole(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({ role: e.currentTarget.innerText })
  }
  private onChangeType(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({ type: e.currentTarget.innerText })
  }
  private onChangeSize(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({ size: e.currentTarget.innerText })
  }
}

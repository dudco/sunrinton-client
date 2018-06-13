import * as React from 'react';

import * as classNames from 'classnames/bind';
import * as styles from './Apply.less';
const cx = classNames.bind(styles);

// export interface ApplyProps {
// }

export interface ApplyState {
  name: string;
  gender: string;
  phone: string;
  sID: string;
  team: string;
  role: string;
  type: string;
  project: string;
  size: string;
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
      size: "",
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeSID = this.onChangeSID.bind(this);
    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);

    this.onClickConfirm = this.onClickConfirm.bind(this);
  }

  public render() {
    return (
      <div className={styles.idx}>
        <div>
          <div className={styles.container}>
            <span><span>제</span><span>4</span><span>회</span></span>
            <span>선린해커톤 참가신청서</span>
            <span>참가자가 많을 시 제출한 포트폴리오와 프로젝트 경력을 통해 심사합니다.</span>

            <div>
              {/* 이름 */}
              <div>
                <span>이름</span>
                <div>
                  <input type="text" placeholder="이름을 입력해 주세요." onChange={this.onChangeName} tabIndex={1}/>
                  <div>
                    <button onClick={this.onChangeGender} className={cx({checked: this.state.gender === "남"})}>남</button>
                    <button onClick={this.onChangeGender} className={cx({checked: this.state.gender === "여"})}>여</button>
                  </div>
                </div>
              </div>
              {/* 연락처 */}
              <div>
                <span>연락처</span>
                <div>
                  <input type="text" placeholder="ex) 010-2254-2776" onChange={this.onChangePhone} tabIndex={2}/>
                </div>
              </div>
              {/* 학번 */}
              <div>
                <span>학번</span>
                <div>
                  <input type="text" placeholder="31104" onChange={this.onChangeSID} maxLength={5} tabIndex={3}/>
                </div>
              </div>
              {/* 팀명 */}
              <div>
                <span>팀명</span>
                <div>
                  <input type="text" placeholder="10글자이내로 입력해주세요." onChange={this.onChangeTeam} maxLength={10} tabIndex={4}/>
                </div>
              </div>
              {/* 직군 */}
              <div>
                <span>직군</span>
                <div>
                  <button onClick={this.onChangeRole} className={cx({checked: this.state.role === "팀장"})}>팀장</button>
                  <button onClick={this.onChangeRole} className={cx({checked: this.state.role === "개발"})}>개발</button>
                  <button onClick={this.onChangeRole} className={cx({checked: this.state.role === "디자인"})}>디자인</button>
                </div>
              </div>
              {/* 분야 */}
              <div>
                <span>분야</span>
                <div>
                  <button onClick={this.onChangeType} className={cx({checked: this.state.type === "생활"})}>생활</button>
                  <button onClick={this.onChangeType} className={cx({checked: this.state.type === "게임"})}>게임</button>
                </div>
              </div>
              {/* 포트폴리오 */}
              <div>
                <span>포트폴리오</span>
                <input type="file" id="portfolio" />
                <label htmlFor="portfolio">파일선택</label>
                <span>20MB 이내로 첨부해주세요 (선택)</span>
              </div>
              {/* 프로젝트 */}
              <div>
                <span>프로젝트</span>
                <textarea placeholder="참여했던 프로젝트 등을 설명해주세요. (500자 이내)" maxLength={500} onChange={this.onChangeProject} tabIndex={5}/>
              </div>
              {/* 사이즈 */}
              <div>
                <span>사이즈</span>
                <div>
                  <button onClick={this.onChangeSize} className={cx({checked: this.state.size === "S"})}>S</button>
                  <button onClick={this.onChangeSize} className={cx({checked: this.state.size === "M"})}>M</button>
                  <button onClick={this.onChangeSize} className={cx({checked: this.state.size === "L"})}>L</button>
                  <button onClick={this.onChangeSize} className={cx({checked: this.state.size === "XL"})}>XL</button>
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
    console.log(this.state);
  }

  private onChangeName(e: React.FormEvent<HTMLInputElement>) {
    this.setState({name: e.currentTarget.value})
  }
  private onChangePhone(e: React.FormEvent<HTMLInputElement>) {
    this.setState({phone: e.currentTarget.value})
  }
  private onChangeTeam(e: React.FormEvent<HTMLInputElement>) {
    this.setState({team: e.currentTarget.value})
  }
  private onChangeSID(e: React.FormEvent<HTMLInputElement>) {
    this.setState({sID: e.currentTarget.value})
  }
  private onChangeProject(e: React.FormEvent<HTMLTextAreaElement>) {
    this.setState({project: e.currentTarget.value})
  }
  private onChangeGender(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({gender: e.currentTarget.innerText})
  }
  private onChangeRole(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({role: e.currentTarget.innerText})
  }
  private onChangeType(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({type: e.currentTarget.innerText})    
  }
  private onChangeSize(e: React.FormEvent<HTMLButtonElement>) {
    this.setState({size: e.currentTarget.innerText})    
  }
}

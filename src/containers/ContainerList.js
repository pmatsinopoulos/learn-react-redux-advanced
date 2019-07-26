import { connect } from 'react-redux'
import List from '../components/List.jsx'

const mapStateToProps = state => {
  return {
    state: state
  }
}

export default connect(
  mapStateToProps
)(List)
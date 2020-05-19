import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layer, Box, Text } from "grommet";
import { StatusGood, StatusCritical } from "grommet-icons";

const Alert = ({ alerts }) =>
  alerts != null &&
  alerts.length > 0 && (
    <Layer
      position='bottom'
      modal={false}
      margin={{ vertical: "medium", horizontal: "small" }}
      responsive={false}
      plain
      gap='small'
    >
      {alerts.map((alert) => (
        <Box
          key={alert.id}
          align='center'
          direction='row'
          gap='small'
          justify='between'
          round='medium'
          elevation='medium'
          pad={{ vertical: "xsmall", horizontal: "small" }}
          background={
            alert.alertType === "danger" ? "status-critical" : "status-ok"
          }
        >
          <Box align='center' direction='row' gap='small'>
            {alert.alertType === "danger" ? <StatusCritical /> : <StatusGood />}
            <Text>{alert.msg}</Text>
          </Box>
        </Box>
      ))}
    </Layer>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

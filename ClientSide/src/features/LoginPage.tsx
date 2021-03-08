import React from 'react'
import { Grid } from 'semantic-ui-react'

export const LoginPage = () => {
    return (
        <Grid centered style={{ paddingTop: '4em' }}>
            <Grid.Column computer={4} mobile={16}>
                <div className="ui middle aligned center aligned grid">
                    <div className="column">
                        <h2 className="ui image header">
                            <div className="content">
                                Log-in to your account
                </div>
                        </h2>
                        <form action="https://s.codepen.io/voltron2112/debug/PqrEPM?" method="get" className="ui large form">
                            <div className="ui stacked secondary  segment">
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input type="text" name="email" placeholder="E-mail address" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="lock icon"></i>
                                        <input type="password" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="ui fluid large teal submit button">Login</div>
                            </div>

                            <div className="ui error message"></div>

                        </form>

                        <div className="ui message">
                            New to us? <a href="https://s.codepen.io/voltron2112/debug/PqrEPM?">Register</a>
                        </div>
                    </div>
                </div>
            </Grid.Column>
        </Grid>
    )
}

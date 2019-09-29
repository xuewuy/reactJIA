import React from 'react';
import {Modal, Button, Form, Input} from 'antd';
const FormItem = Form.Item;
import {increaseAction} from './conetent/content01/action';

class FromContent01 extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    this.props.submit(values);
                }
            });
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {closeModal, date} = this.props;

        return (
            <Modal
                title="添加一个成员"
                key={date}
                visible={true}
                onCancel={closeModal}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input your name!'}],
                        })(
                            <Input placeholder="姓名"/>
                        )}
                    </FormItem>
                    <FormItem label="年龄">
                        {getFieldDecorator('age', {
                            rules: [{required: true, message: 'Please input your age!'}],
                        })(
                            <Input placeholder="年龄"/>
                        )}
                    </FormItem>
                    <FormItem label="电话号码">
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true, message: 'Please input your phone!',
                            }],
                        })(
                            <Input type="电话号码"/>
                        )}
                    </FormItem>
                    <FormItem label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true, message: 'Please input your email!',
                            }],
                        })(
                            <Input type="邮箱"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
const FromContent = Form.create()(FromContent01);
export default FromContent;
